module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/onboard', // redirect to main
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/onboard', isLoggedIn, function(req, res) {
        res.render('onboard.ejs', {
            user: req.user
        });
    });

    app.get('/main', isLoggedIn, function(req, res) {
        res.render('main.ejs', {
            user: req.user
        });
    });

    app.get('/settings', isLoggedIn, function(req, res) {
        res.render('settings', {
            user: req.user
        });
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
