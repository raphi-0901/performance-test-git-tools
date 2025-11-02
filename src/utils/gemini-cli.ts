import pty from 'node-pty';

/**
 * Interactive Gemini session using a pseudo-terminal (PTY)
 * that preserves full tool functionality (like !git commands).
 */
async function runGeminiWithPTY(commands: string[]) {
    return new Promise((resolve) => {
        // Start Gemini inside a PTY (pretend it's a real terminal)
        const shell = pty.spawn('gemini', ['--yolo'], {
            name: 'xterm-color',
            cols: 120,
            rows: 40,
            cwd: process.cwd(),
            env: process.env,
        });

        let output = '';

        shell.onData(async(data) => {
            process.stdout.write(data);
            output += data;

            if(data.trim().length > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Send commands sequentially
            const nextCommand = commands[0];
            if (nextCommand && data.includes("no sandbox")) {
                process.stdout.write(`\n[Script] Sending: ${nextCommand}`);
                shell.write(nextCommand + '\r');
                commands.shift();

                // Exit when all commands are sent
                if (commands.length === 0) {
                    setTimeout(() => {
                        shell.write('/quit\r');
                        resolve(output);
                    }, 3000);
                }
            }
        });
    });
}

// --- Example usage ---
(async () => {
    const result = await runGeminiWithPTY([
        'I want you to create a conventional commit message for me for the staged files in the current directory.',
    ]);

    console.log('\n-----------------------------------------');
    console.log('✅ Gemini PTY session complete.');
    console.log(result.slice(-400));
    console.log('-----------------------------------------');
})();
