#!/usr/bin/env node
/**
 * Script de diagnóstico para DataFixComp
 * Verifica la conectividad entre frontend y backend
 */

const http = require('http');
const https = require('https');

const TESTS = [
  {
    name: 'Usuarios API - GET /usuarios',
    url: 'http://localhost:8081/api/v1/usuarios',
    method: 'GET'
  },
  {
    name: 'Usuarios API - POST /registro (validación)',
    url: 'http://localhost:8081/api/v1/usuarios/registro',
    method: 'POST',
    body: { email: 'test@test.com', password: 'test123', nombre: 'Test', apellido: 'User' }
  },
  {
    name: 'Productos API - GET /productos',
    url: 'http://localhost:8082/api/v1/productos',
    method: 'GET'
  },
  {
    name: 'Productos API - GET /activos',
    url: 'http://localhost:8082/api/v1/productos/activos',
    method: 'GET'
  },
  {
    name: 'H2 Console - Usuarios',
    url: 'http://localhost:8081/h2-console',
    method: 'GET'
  },
  {
    name: 'H2 Console - Productos',
    url: 'http://localhost:8082/h2-console',
    method: 'GET'
  }
];

function makeRequest(test) {
  return new Promise((resolve) => {
    const urlObj = new URL(test.url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: test.method,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    };

    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          test: test.name,
          status: res.statusCode,
          statusText: res.statusMessage,
          success: res.statusCode >= 200 && res.statusCode < 500
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        test: test.name,
        status: 0,
        statusText: error.message,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        test: test.name,
        status: 0,
        statusText: 'TIMEOUT',
        success: false
      });
    });

    if (test.body) {
      req.write(JSON.stringify(test.body));
    }
    req.end();
  });
}

async function runDiagnostics() {
  console.log('\n' + '='.repeat(60));
  console.log('  DataFixComp - Diagnóstico de Conectividad');
  console.log('='.repeat(60) + '\n');

  console.log('Verificando servicios en local...\n');

  const results = [];
  for (const test of TESTS) {
    const result = await makeRequest(test);
    results.push(result);
    
    const icon = result.success ? '✓' : '✗';
    const color = result.success ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    
    console.log(`${color}${icon}${reset} ${result.test}`);
    console.log(`  Status: ${result.status} ${result.statusText}\n`);
  }

  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;

  console.log('='.repeat(60));
  console.log(`Resultado: ${successCount}/${totalCount} servicios responden`);
  console.log('='.repeat(60) + '\n');

  if (successCount === totalCount) {
    console.log('✓ Todos los servicios están activos y respondiendo correctamente');
    console.log('\nPuedes acceder a:');
    console.log('  - Frontend:           http://localhost:5173');
    console.log('  - Usuarios API:       http://localhost:8081/api/v1/usuarios');
    console.log('  - Productos API:      http://localhost:8082/api/v1/productos');
  } else {
    console.log('✗ Algunos servicios no están disponibles:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.test}: ${r.statusText}`);
    });
    console.log('\nAsegúrate de ejecutar:');
    console.log('  Terminal 1: cd microservicioUsuario && ./mvnw.cmd spring-boot:run');
    console.log('  Terminal 2: cd microservicioProducto && ./mvnw.cmd spring-boot:run');
    console.log('  Terminal 3: npm run dev');
  }
  console.log('\n');
}

runDiagnostics();
