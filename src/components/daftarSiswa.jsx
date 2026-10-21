
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'

const fetcher = async () => {
    const response = await axios.get('http://localhost:8000/siswa', {
        headers: {
            Accept: 'application/json'
        }
    })

    return response.data
}

const DaftarSiswa = () => {
    const { mutate } = useSWRConfig()

    const { data, error, isLoading } = useSWR(
        'http://localhost:8000/siswa',
        fetcher
    )

    const deleteSiswa = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
            try {
                await axios.delete(`http://localhost:8000/siswa/${id}`)
                mutate('http://localhost:8000/siswa')
            } catch (error) {
                alert('Gagal menghapus data siswa.')
            }
        }
    }

    if (error) {
        return (
            <div className="p-10 text-center font-medium text-red-600">
                Gagal memuat data siswa.
            </div>
        )
    }

    if (isLoading || !data) {
        return (
            <div className="p-10 text-center text-blue-600">
                Memuat data siswa...
            </div>
        )
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 px-4 py-10 sm:px-8">

            {/* Dekorasi background */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl"></div>
            <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-7 flex flex-col gap-5 rounded-2xl border border-white/70 bg-white/90 p-6 shadow-lg shadow-blue-100/50 sm:flex-row sm:items-center sm:justify-between sm:p-8">

                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-200">
                            🎓
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                                Daftar Siswa
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Kelola data siswa dengan mudah
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/tambah"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-md shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                    >
                        <span className="text-xl">+</span>
                        Tambah Siswa
                    </Link>
                </div>

                {/* Card tabel */}
                <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl shadow-blue-100/60">

                    {/* Informasi tabel */}
                    <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                Semua Siswa
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Informasi siswa yang terdaftar
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                            <span>👥</span>
                            Total siswa:
                            <span className="font-bold">{data.length}</span>
                        </div>
                    </div>

                    {/* Tabel */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm">

                            <thead>
                                <tr className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                                    <th className="px-6 py-4 font-semibold">
                                        No.
                                    </th>

                                    <th className="px-6 py-4 font-semibold">
                                        Nama Siswa
                                    </th>

                                    <th className="px-6 py-4 text-center font-semibold">
                                        Umur
                                    </th>

                                    <th className="px-6 py-4 text-center font-semibold">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {data.map((siswa, idx) => (
                                    <tr
                                        key={siswa.id}
                                        className="transition duration-200 hover:bg-blue-50/70"
                                    >
                                        <td className="px-6 py-5 font-medium text-slate-400">
                                            {String(idx + 1).padStart(2, '0')}
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 font-bold text-blue-700">
                                                    {siswa.nama?.charAt(0).toUpperCase() || '?'}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-800">
                                                        {siswa.nama}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        ID Siswa: {siswa.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                                                🎂 {siswa.umur} tahun
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    to={`/edit/${siswa.id}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                                                >
                                                    <span>✎</span>
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => deleteSiswa(siswa.id)}
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                                                >
                                                    <span>🗑</span>
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-16 text-center">
                                            <div className="mb-3 text-4xl">🎓</div>

                                            <p className="font-semibold text-slate-700">
                                                Belum ada data siswa
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Klik tombol Tambah Siswa untuk mulai mengisi data.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                            Menampilkan {data.length} data siswa
                        </p>

                        <p className="text-xs font-medium text-slate-400">
                            Sistem Manajemen Siswa
                        </p>
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-slate-400">
                    Data siswa tersusun rapi, pengelolaan jadi lebih praktis.
                </p>
            </div>
        </div>
    )
}

export default DaftarSiswa
