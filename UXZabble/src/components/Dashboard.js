import React, { Component } from 'react'
import QuickSightEmbedding, { embedDashboard } from 'amazon-quicksight-embedding-sdk'




class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                url: "https://us-east-1.quicksight.aws.amazon.com/embed/7e3f2b6ad19d43c198c6521ff75121df/dashboards/c7090609-088d-4521-9135-bb3aba8b931a?isauthcode=true&identityprovider=quicksight&code=AYABeIrmhxV3PoTnRLG7rVaLrekAAAABAAdhd3Mta21zAEthcm46YXdzOmttczp1cy1lYXN0LTE6MjU5NDgwNDYyMTMyOmtleS81NGYwMjdiYy03MDJhLTQxY2YtYmViNS0xNDViOTExNzFkYzMAuAECAQB4l6pD2xhUY2WZ3LzF9ADzT04TvWztj3rAluPGmvaui90B29MXlBeelNo8_AHRwvFA2gAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDPTAhVynQgqKu4JJzwIBEIA78SgL",
                container: document.getElementById("dashboardContainer"),
                parameters: {
                    country: "United States",
                    states: [
                        "California",
                        "Washington"
                    ]
                },
                scrolling: "yes",

                width: "100%"
            }
        }


    }

    onDashboardLoad = (payload) => {
        console.log("Dashboard Loaded.");
    }
    onError = (payload) => {
        console.log("Dashboard Failed");
    }



    // parses JSON response into native JavaScript objects






    onDashboardLoad = (payload) => {
        console.log("Do something when the dashboard is fully loaded.");
    }

    onError = (payload) => {
        console.log("Do something when the dashboard fails loading");
    }




    handleClick = () => {
        var dashboard
        var containerDiv = document.getElementById("dashboardContainer");
        var options = {
            url: this.props.Authprops.dashboard,
            container: containerDiv,
            parameters: {
                country: "United States",
                states: [
                    "California",
                    "Washington"
                ]
            },
            scrolling: "yes",
            height: "80%",
            width: "60%"
        }
        dashboard = embedDashboard(options);
        dashboard.on("error", this.onError);
        dashboard.on("load", this.onDashboardLoad);
    }

    componentDidMount() {
        console.log(this.props)


    }
    render() {

        return (
            <div id="dashboardContainer">
                <div className="dashboard-btn_container">
                    {!this.props.Authprops.ThereisDashboard ? (
                        <React.Fragment>
                            <h4 className="dashboard-msg">
                                Building dashboard with Quicksight analytics. Please, do not refresh page.
                                </h4>
                            <button className="to-dashboard_button">
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </button>
                        </React.Fragment>
                    ) : (
                        <div>
                            <button onClick={this.handleClick} className="to-dashboard_button done">
                                Go to Dashboard
                            </button>
                        </div>
                        )}

                </div>
            </div>

        )
    }
}


export default Dashboard