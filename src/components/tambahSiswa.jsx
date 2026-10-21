
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const TambahSiswa = () => {
    const [nama, setNama] = useState('')
    const [umur, setUmur] = useState('')
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const simpanSiswa = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            await axios.post('http://localhost:8000/siswa', {
                nama: nama,
                umur: Number(umur)
            })

            navigate('/')
        } catch (error) {
            alert('Gagal menyimpan data siswa.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 px-4 py-10">

            {/* Dekorasi background */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl"></div>

            <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl"></div>

            {/* Form card */}
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl shadow-blue-200/50">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-8 text-center text-white sm:px-8">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-inner">
                        🎓
                    </div>

                    <h1 className="text-2xl font-bold">
                        Tambah Data Siswa
                    </h1>

                    <p className="mt-2 text-sm text-blue-100">
                        Daftarkan siswa baru dengan mengisi form berikut
                    </p>
                </div>

                {/* Isi form */}
                <form onSubmit={simpanSiswa} className="space-y-6 p-6 sm:p-8">

                    {/* Input nama */}
                    <div>
                        <label
                            htmlFor="nama"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Nama Siswa
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                            <span className="pl-4 text-lg">👤</span>

                            <input
                                id="nama"
                                type="text"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Masukkan nama siswa"
                                required
                                className="w-full rounded-xl bg-transparent px-4 py-3.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Input umur */}
                    <div>
                        <label
                            htmlFor="umur"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Umur Siswa
                        </label>

                        <div className="flex items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                            <span className="pl-4 text-lg">🎂</span>

                            <input
                                id="umur"
                                type="number"
                                min="1"
                                value={umur}
                                onChange={(e) => setUmur(e.target.value)}
                                placeholder="Masukkan umur siswa"
                                required
                                className="w-full rounded-xl bg-transparent px-4 py-3.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                            />

                            <span className="pr-4 text-sm text-slate-400">
                                tahun
                            </span>
                        </div>
                    </div>

                    {/* Tombol aksi */}
                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

                        <Link
                            to="/"
                            className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                            ← Kembali
                        </Link>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? 'Menyimpan...' : '+ Simpan Siswa'}
                        </button>

                    </div>
                </form>

                {/* Footer */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center">
                    <p className="text-xs text-slate-400">
                        Pastikan informasi siswa sudah benar sebelum disimpan.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default TambahSiswa
