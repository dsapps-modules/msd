# Acesso Local

## O que abre

- Admin: `http://127.0.0.1:3000/pt-BR/admin/signin`
- Seller: `http://127.0.0.1:3000/pt-BR/seller/signin`
- API: `http://127.0.0.1:8000/api/v1/site-general-info`
- Frontend web: `http://127.0.0.1:3001`

> Observacao: `3001` serve o storefront Flutter. As rotas de `admin` e `seller`
> ficam no painel Next.js em `3000`, entao `http://127.0.0.1:3001/pt-BR/seller/signin`
> vai mesmo retornar 404.

## Credenciais demo

- Admin: `divulgador@teste.com.br` / `12345678`
- Seller: `owner@store.com` / `12345678`
- Customer: `customer@gmail.com` / `12345678`
- Deliveryman: `deliveryman@gmail.com` / `12345678`

## Subida rapida

Na raiz do projeto:

```powershell
.\start-local.ps1
```

Esse script sobe por padrao:

- MySQL
- API Laravel
- Admin Next.js
- Frontend Flutter web apenas se voce passar `-StartFrontendFlutter`

## Frontend Flutter

Se quiser tentar subir o frontend Flutter junto, ative o Developer Mode do Windows e rode:

```powershell
.\start-local.ps1 -StartFrontendFlutter
```

Se preferir executar manualmente:

```powershell
cd frontend
& 'C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\pingbird.Puro_Microsoft.Winget.Source_8wekyb3d8bbwe\puro.exe' -e stable flutter pub get
& 'C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\pingbird.Puro_Microsoft.Winget.Source_8wekyb3d8bbwe\puro.exe' -e stable flutter run -d chrome --web-hostname 127.0.0.1 --web-port 3001 --dart-define=APP_BASE_URL=http://127.0.0.1:8000
```
