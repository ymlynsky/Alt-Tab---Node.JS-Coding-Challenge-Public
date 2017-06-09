module.exports = app => {
	// 404 Error handler
	app.use((req, res, next) => {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// Error handler
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		if (app.get('env') === 'development') {
			res.json({
				message: err.message,
				error: err
			});
		} else  {
			res.json({
				message: err.message,
				error: {}
			});		
		}
	});
}