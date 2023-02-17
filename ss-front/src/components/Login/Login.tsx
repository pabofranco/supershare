import './Login.css'

function Login() {
    return (
        <div className="container">
            <form>
                <div className="row g-0">
                    <p className="title">Log in</p>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="E-mail" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group mt-1">
                            <input type="password" name="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group mt-1">
                            <button type="button" className="btn btn-primary btn-block f-r">Log in</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8">
                    <p className="undertext">Don't have an account? <a href="/registration" className="register-link">Register here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;