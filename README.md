## Deploy
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

## Troubleshoot
Jika proses deploy atau install dependencies gagal tambahkan atau edit file **/etc/docker/daemon.json**
```sh
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```
Lalu restart service docker
