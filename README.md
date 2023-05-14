## Notes

Ada masalah saat mengganti port odoo jadi tidak bisa diakses lewat API, jadi odoo harus tetap di port 8069

## Deployment
**Clone repository**

```sh
git clone https://github.com/rizki182/efishery-odoo-rizki.git
```

**Masuk ke folder project**
```sh
cd efishery-odoo-rizki
```

**Ubah folder permission**
```sh
chmod -R 777 volumes/data/web
```

**Deploy**
```sh
docker compose up -d
```
**Install dependencies**<br />
Setelah proses deploy selesai tunggu beberapa saat karena masing - masing container akan menginstall dependencies secara otomatis. Untuk melihat prosesnya gunakan perintah berikut


```sh
docker logs -f efishery-odoo-rizki-web-1
docker logs -f efishery-odoo-rizki-interceptor-1
docker logs -f efishery-odoo-rizki-db-1
```

## Postman

Untuk mencoba API odoo dan interceptor bisa import **postman_collection.json** ke aplikasi postman

## Configurations
Berikut file untuk mengubah beberapa konfigurasi aplikasi
```sh
.env -> konfigurasi port yang digunakan
  - ODOO_PORT -> port yang dipakai untuk aplikasi web odoo
  - INTERCEPTOR_PORT -> port yang dipakai untuk API interceptor

interceptor/code/.env -> konfigurasi integrasi antara interceptor dan odoo
  - ODOO_PORT -> port yang diakses interceptor untuk integrasi dengan odoo
  - ODOO_API_KEY -> key yang digunakan interceptor untuk autentikasi odoo
  - API_KEY - > key yang digunakan odoo untuk mengakses webhook endpoint dari interceptor
```

Untuk mengubah/menambah API key yang digunakan untuk autentikasi odoo, lakukan langkah berikut untuk mengakses menu Auth Api Key
```sh
Aktifkan developer mode terlebih dahulu
Menu -> Setting -> Scroll ke bagian Developer Tools -> Activate the developer mode

Lalu akses menu API key di
Menu -> Setting -> Technical -> Auth Api Key
```

Untuk mengubah/menambah script akses ke interceptor webhook, lakukan langkah berikut untuk mengakses menu Automation
```sh
Aktifkan developer mode terlebih dahulu
Menu -> Setting -> Scroll ke bagian Developer Tools -> Activate the developer mode

Lalu akses menu Automation
Menu -> Setting -> Technical -> Automation
```

## Troubleshoot
Jika proses deploy atau install dependencies gagal tambahkan atau edit file **/etc/docker/daemon.json**
```sh
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```
Lalu restart service docker
