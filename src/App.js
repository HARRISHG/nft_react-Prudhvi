//import { InfuraProvider } from "@ethersproject/providers";
import { BrowserRouter } from "react-router-dom";

//Redux
import AppRoutes from "./AppRoutes";

/*
const project_id = "0be5ac964dfe454badcdf19f581ea45e";
const project_secret = "5d4459bd4ff04887a9521ab2bea366fa";
const Provider = new InfuraProvider("homestead", {
  project_id,
  project_secret,
});
*/

/*
const url = "https://mainnet.infura.io/v3/";
const data = {
  "jsonrpc":"2.0", //mandator option for jsonrpc
  "method":"eth_getBlockByNumber", //methods defined by infura
  "params":["0x5BAD55",false], //parameters to fetch data it can be an array or a json object
  "id":1 //must pass integer only, floats and strings not allowed
};

axios.post(url+project_id,data)
.then((response)=>{
  console.log(response);
})
.catch((error)=>{
  console.log(error);
});
*/

//End of Infura Provider

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
