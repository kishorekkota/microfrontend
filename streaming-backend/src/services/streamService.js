class StreamService {
    constructor() {
        this.clients = [];
    }

    startStream(req, res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const clientId = Date.now();
        const newClient = { id: clientId, res };

        this.clients.push(newClient);

        req.on('close', () => {
            this.clients = this.clients.filter(client => client.id !== clientId);
        });

        // Example of sending data to the client every second
        const intervalId = setInterval(() => {
            const data = `data: ${new Date().toISOString()}\n\n`;
            newClient.res.write(data);
        }, 1000);

        // Clear interval when the connection is closed
        req.on('close', () => {
            clearInterval(intervalId);
            newClient.res.end();
        });
    }
}

module.exports = StreamService;