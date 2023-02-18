import './RegistrationTemplate.css';

export const RegistrationTemplate = () => {
    return (
        <div className="container">
            <form>
                <div className="row g-0">
                    <p className="title">Sign up</p>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="E-mail"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group mt-1">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group mt-1">
                            <input
                                type="password"
                                className="form-control"
                                name="confirmation"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="form-group mt-1">
                            <button type="button" className="btn btn-primary btn-block f-r">Register</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
