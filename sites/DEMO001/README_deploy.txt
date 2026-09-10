取付管ID デモアプリ ／ 配置手順
================================

■ 置き場所
  GitHub リポジトリ mapping-demo2 の
  sites/DEMO001/ フォルダに、この8ファイルをすべて置きます。

■ ファイル一覧
  nfc.html                 アプリ本体（既存を上書き）
  sw.js                    Service Worker（全画面起動・オフライン用）
  manifest.json            PWA定義
  history.json             履歴データ（クラウド想定）
  icon-192.png             アイコン
  icon-512.png             アイコン
  icon-maskable-512.png    アイコン（Android用）
  apple-touch-icon.png     アイコン（iOS用）

  ※ この _配置手順.txt はアップロード不要です。

■ アップロード方法
  1. GitHub で mapping-demo2 → sites → DEMO001 を開く
  2. 「Add file」→「Upload files」
  3. 上記8ファイルをまとめてドラッグ
  4. 「Commit changes」
  ※ nfc.html は同名なので自動で上書きされます。

■ 公開URL
  https://kanisg26.github.io/mapping-demo2/sites/DEMO001/nfc.html
  反映まで1〜2分かかります。

■ 動作確認
  1. PCで開く          → 待機画面。「デモデータで開く」で4タブ表示
  2. Androidブラウザ   → タグをかざす。URLバーあり・未認証
  3. ホーム画面に追加  → Chromeメニューから
  4. アイコンから起動  → URLバーなし・「○○市 下水道課」で認証済み
  5. タグをかざす      → ブラウザではなくアプリが全画面起動

■ タグへの書き込み
  Androidのアプリで「記録」タブ →「タグに書き込む」。
  URLは開いているページから自動生成されるので手入力は不要です。

■ 注意
  ・NFCの読み書きはAndroid Chromeのみ。iPhoneは閲覧のみ。
  ・NFC Toolsの「読み取り専用にする」は絶対に押さないでください（不可逆）。
