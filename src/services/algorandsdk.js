import algosdk from 'algosdk';

const token = {
	'X-API-Key': process.env.REACT_APP_PURESTAKE_API_KEY
}
const server = 'https://testnet-algorand.api.purestake.io/ps2'
const port = ''

// algod client
const AlgorandClient = new algosdk.Algodv2(token, server, port);
export default AlgorandClient;
