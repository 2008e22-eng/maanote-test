# MaaNote v0.9 Stage 7 - GitHub Pages TEST

このフォルダの中身を GitHub リポジトリのルートへ置いてください。

## GitHub Pages 設定
- Settings → Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)

公開URL例:
`https://<ユーザー名>.github.io/<リポジトリ名>/`

管理者TEST画面:
`https://<ユーザー名>.github.io/<リポジトリ名>/admin.html`

## 注意
- Stage 7 の管理者画面は本番認証ではなく、同じブラウザ内で管理者配信をシミュレーションするTEST機能です。
- GitHub Pagesへ置いても、CD枚数・TODO・旅程などの個人データはGitHubへ保存されません。端末のブラウザ保存領域を使用します。
- GitHub Pages上ではリポジトリ名配下で動作するよう、アプリ内参照は相対パスのままです。


## iPhoneで「端末保存の初期化に失敗しました」と出た場合
この修正版は、同じGitHub Pages URLでRC2など新しい版を先に開いた端末でも、既存のIndexedDBをそのまま開けるように修正済みです。
リポジトリへ上書きしてCommit/Push後、Safariでページを再読み込みしてください。必要ならSafariを完全終了して開き直してください。


## 2026-10-03 compact2
- Home typography compacted to match the approved iPhone reference.
- Official 3rd single event data marked updated 2026-10-02.
- 11/15 Kinshicho details use the published venue/event information (14:00/17:00, sales 11:00, limit 4, shipping 950, priority assembly 20 min before).


## reference4 更新
- 管理者プレビューから「閉じる / 編集に戻る」で入力内容を保持して編集画面へ戻るよう修正
- プレビューから直接「この内容を公開」可能
- ホームの文字サイズを参考画像に合わせて拡大
