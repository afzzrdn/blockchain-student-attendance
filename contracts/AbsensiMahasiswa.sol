// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AbsensiMahasiswa {
    struct DataAbsensi {
        string nim;
        string nama;
        string kodeKelas;
        string waktu;
    }

    DataAbsensi[] public absensiLog;

    event AbsensiTercatat(string nim, string kodeKelas, string nama, string waktu);

    function logAbsensi(string memory _nim, string memory _kodeKelas, string memory _nama, string memory _waktu) public {
        absensiLog.push(DataAbsensi({
            nim: _nim,
            kodeKelas: _kodeKelas,
            nama: _nama,
            waktu: _waktu
        }));

        emit AbsensiTercatat(_nim, _kodeKelas, _nama, _waktu);
    }

    function getAbsensi(uint256 index) public view returns (string memory nim, string memory kodeKelas, string memory nama, string memory waktu) {
        require(index < absensiLog.length, "Index out of bounds");
        DataAbsensi memory data = absensiLog[index];
        return (data.nim, data.kodeKelas, data.nama, data.waktu);
    }

    function getTotalAbsensi() public view returns (uint256) {
        return absensiLog.length;
    }

    function getAbsensiLog() public view returns (DataAbsensi[] memory) {
        return absensiLog;
    }
}
