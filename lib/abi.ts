export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
export const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "nim",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "kodeKelas",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "waktu",
          "type": "string"
        }
      ],
      "name": "AbsensiTercatat",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "absensiLog",
      "outputs": [
        {
          "internalType": "string",
          "name": "nim",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "kodeKelas",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "waktu",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getAbsensi",
      "outputs": [
        {
          "internalType": "string",
          "name": "nim",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "kodeKelas",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "waktu",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAbsensiLog",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "nim",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "kodeKelas",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "waktu",
              "type": "string"
            }
          ],
          "internalType": "struct AbsensiMahasiswa.DataAbsensi[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalAbsensi",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nim",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_kodeKelas",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_waktu",
          "type": "string"
        }
      ],
      "name": "logAbsensi",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
