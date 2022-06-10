
import './App.css';
import { useState } from 'react';
import Chart from './Chart';
import Search from './Search';

var W3CWebSocket = require('websocket').w3cwebsocket;
const client = new W3CWebSocket('wss://ws.blockchain.info/inv');






function App() {
  const [transaction, setTransaction] = useState([]);
  const [type, setType] = useState("chart");


  client.onerror = () => console.log('Connection Error');

  client.onopen = () => {
    console.log('WebSocket Client Connected');
    client.send(JSON.stringify({ "op": "unconfirmed_sub" }));
  };


  client.onmessage = function (msg) {

    const transactionData = JSON.parse(msg.data).x;

    const BTC = (transactionData.inputs[0]?.prev_out?.value) / 100000000;

    const time = Number(transactionData.time) * 1000;

    let newTra = [...transaction];
    if (BTC > 0.1) newTra.push({ value: BTC, time: new Date(time).toLocaleString(), hash: transactionData?.hash });

    if (transaction?.length > 10) newTra.shift();

    setTransaction(newTra);


  }

  client.onclose = () => console.log('echo-protocol Client Closed');


  const setMenu = (type) => {
    if (type === "Chart")
      setType("Chart");
    else
      setType("Search")
  }


  const passData = {
    labels: transaction?.map((d) => d.time),
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: 'BTC amount',
        data: transaction?.map((d) => d.value),
        // you can set indiviual colors for each bar

        borderWidth: 1,
      }
    ]
  }
  return (
    <div className="App">
      <div class="menu">
        <button onClick={() => setMenu("Chart")}>Chart</button>
        <button onClick={() => setMenu("Search")}>Search Box</button>
      </div>
      {
        type === 'Chart' ? (
          <Chart chartData={passData} />
        ) : (
          <Search data={transaction} />
        )
      }


    </div>
  );
}

export default App;
