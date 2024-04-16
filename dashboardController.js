const dashboard = (req, res) => {
    // Implementation of dashboard logic
    if(req.session.userId) {
        res.send('Welcome to Dashboard');
    } else {
        res.sendStatus(400);
    }
};

export { dashboard };