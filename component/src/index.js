import React from 'react';
import ReactDOM from 'react-dom/client';

const socketUrl = 'ws://localhost:9080/super';

class SupTable extends React.Component {
/*
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }
*/
    render() {

        return (
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Trx</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Tiempo</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.data.map((val, key) => {
                    return (
                    <tr key={key}>
                        <td>{val.user}</td>
                        <td>{val.lastName}</td>
                        <td>{val.name}</td>
                        <td>{val.transaction}</td>
                        <td>{val.description}</td>
                        <td>{val.status}</td>
                        <td>{val.time}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}

class SupBoard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    prepareNotifications() {
        if (!("Notification" in window)) {
            console.log("Browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }        
    }

    showNotification(message) {
        if (!("Notification" in window)) {
            console.log(message);
        } else if (Notification.permission === "granted") {
            new Notification(message);
        }
    }

    componentDidMount() {
        this.prepareNotifications();
        /*let d = [{
            user: 'User1', lastName: 'TheLastName', name: 'TheName', transaction: '10001', description: 'Controles', status: 'Pendiente', time: '0'
        }];
        this.setState({data: d});*/
        
        /*axios.get('/test').then((r) => {
            this.setState({title: r});
        })*/

        const ws = new WebSocket(socketUrl);
        ws.onmessage = (event) => {
            console.log("got " + event.data);
            const json = JSON.parse(event.data);
            
            try {
                this.setState({data: json});
                this.showNotification("Nuevas transacciones pendientes de Autorización");
            } catch (err) {
                console.log(err);
            }
        }
    }

    render() {
        return (
            <div id="supervisor-table-component">
                <SupTable data={this.state.data}/>
            </div>
        );
    }
}

/* =========================================== */

const root = ReactDOM.createRoot(document.getElementById("supervisor-dashboard"));
root.render(<SupBoard />);

