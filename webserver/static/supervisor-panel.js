// https://tabulator.info/docs/5.4/quickstart

const { Observable, from, retry } = rxjs;
const { webSocket } = rxjs.webSocket;

getWsUrl = (ws) => {
    let l = window.location;
    return ((l.protocol === "https:") ? "wss:///" : "ws:///") + l.host + l.pathname + ws;
}

"use strict";
(function ( $ ) {

    $.fn.createSupervisorPanel = function( options ) {

        //var settings = $.extend({}, options );        
        const url = 'ws://localhost:9080/super';
        //const url = getWsUrl();

        const retryConfig = {
            delay: 3000
        };

        var tableContainer = $('<div class="supervisor-table table-sm"></div>');
        this.append(tableContainer);
        
        var options = {
            layout:"fitDataFill",
            data: [],
            columns:[
                {title:"Usuario", field:"user"},
                {title:"Apellido", field:"lastName"},
                {title:"Nombre", field:"name"},
                {title:"Trx", field:"transaction"},
                {title:"Descripción", field:"description"},
                {title:"Estado", field:"status"},
                {title:"Tiempo", field:"time"}
            ]
        };

        this.table = new Tabulator(tableContainer[0], options);

        this.table.on("tableBuilt", function(){
            const iTable = this;
            const subject = webSocket(url);
            subject.pipe(
                retry(2)
            );
            subject.subscribe({
                next: (data) => {
                    console.log(data);
                    iTable.setData(data);
                }, // message received
                error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
                complete: () => console.log("complete")
            });
        });

        return this;
    };

}( jQuery ));