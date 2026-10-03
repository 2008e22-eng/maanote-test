# MaaNote v0.9 Stage 8 - GitHub Pages TEST

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
- Stage 8 の管理者画面は本番認証ではなく、同じブラウザ内で管理者配信をシミュレーションするTEST機能です。
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


## 今回の変更
- ホーム: NEXT EVENTを単独行、次の行に日付・曜日・都道府県
- 会場名の下に会場内場所を表示（登録済みの場合）
- 購入上限を「4枚/1会計」形式に統一
- 管理者新規イベント初期値: 販売13:00 / 部開始16:00 / 優先集合15:40
- 設定: 文字サイズ 小さめ90% / 標準100% / 大きめ120% / 特大140%


## Stage 8: 旧v9.6データ移行
一般画面・設定画面には移行導線を表示しません。既存利用者だけ、次のURLを直接開きます。

`https://<GitHubユーザー名>.github.io/<リポジトリ名>/migrate-v96.html`

旧v9.6側の移行用JSONを選択し、内容と競合を確認してから端末内IndexedDBへ取り込みます。
移行後の旧形式データ・移行履歴もバックアップJSONへ含めるようにしています。


## 文字サイズ初期値変更
- 新規利用時の文字サイズ初期値を 140%（特大）に変更
- 既に利用者が文字サイズを明示的に選択している場合は、その設定を維持


## カレンダー改善
- 祝日を赤字表示
- 日付数字を各マス左上に固定
- イベント系の表示を見やすく調整
- 文字サイズ140%初期値は維持
