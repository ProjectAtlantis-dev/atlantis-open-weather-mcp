#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

// Determine the path to the Python script within the installed package
// __dirname will be node_modules/atlantis-open-weather-mcp/bin
const scriptPath = path.join(__dirname, '..', 'src', 'atlantis_open_weather_mcp', 'weather_mcp_server.py');

// Get arguments passed to the npx command (excluding 'node' and the script name)
const args = process.argv.slice(2);

// Attempt to find a suitable Python executable
// Simple check, could be made more robust if needed
const pythonExecutable = process.env.PYTHON_EXECUTABLE || 'python3'; // Prefer python3

console.log(`Attempting to run ${scriptPath} with ${pythonExecutable}...`);

// Spawn the Python process
const pythonProcess = spawn(pythonExecutable, [scriptPath, ...args], {
    stdio: 'inherit' // Crucial: Inherit stdin, stdout, stderr
});

pythonProcess.on('error', (err) => {
    console.error(`Failed to start Python process with ${pythonExecutable}. Error: ${err.message}`);
    console.error(`Make sure '${pythonExecutable}' is installed and in your PATH.`);
    console.error('Trying fallback with plain \'python\'...');

    // Fallback to 'python' if 'python3' fails
    const fallbackProcess = spawn('python', [scriptPath, ...args], {
        stdio: 'inherit'
    });

    fallbackProcess.on('error', (fallbackErr) => {
        console.error(`Fallback with 'python' also failed. Error: ${fallbackErr.message}`);
        console.error(`Please ensure Python 3.8+ is installed and accessible as 'python' or 'python3'.`);
        console.error('Also, ensure Python dependencies are installed (e.g., \'pip install -r requirements.txt\')');
        process.exit(1);
    });

    fallbackProcess.on('close', (code) => {
        console.log(`Python process (fallback) exited with code ${code}`);
        process.exit(code === null ? 1 : code);
    });
});

pythonProcess.on('close', (code) => {
    // The 'close' event is emitted when the stdio streams have been closed.
    // The 'exit' event is emitted when the process actually exits.
    // Using 'close' is generally better for knowing when it's safe to exit the parent.
    console.log(`Python process exited with code ${code}`);
    process.exit(code === null ? 1 : code); // Exit Node script with the same code as Python
});
