# 開発環境

## 注意

※ コマンド ` $ hogehoge ` を打つというのは、 **hogehoge と打つ** という意味です。  
先頭の `$` は **コマンドへの入力** を意味します。

## webpack

当プロジェクトはモジュールハンドラの [**webpack**](https://webpack.js.org/) を使用しております。

*[参考サイト](https://ics.media/entry/12140/)*

### 構築

1. Git Bash, Command Prompt, PowerShell 等で `/_dev/` に移動して以下のコマンドを実行してください。

```
$ npm i
```

2. `node_modules` というディレクトリが作成されます。

### 実行方法

webpack は **development** と **production** の 2 つのモードがあります。  
Sourcemap の有無、 minify するかしないか、等の違いがあります。

#### development

こちらは開発中に使用します。  
以下のコマンドで実行してください。

```
$ npm run dev
```

こちらのコマンド実行後は webpack が動作し続けるので、そのまま修正を行ってください。

#### production

こちらは開発完了後、納品前に使用します。  
`$ npm run dev` コマンドの実行後である場合、そのコマンドを `Ctrl + C` で止めてください。  
以下のコマンドで実行してください。

```
$ npm run build
```

### JavaScript

webpack はモジュールハンドラなので、機能ごとにファイルが分かれています。  

#### 新規機能追加

- `/_dev/src/js/widget/` に機能に則した名前でファイルを作成してください。<br>*例 : モーダル機能を作成するので、 `modal.js`*
- エントリーポイントである `run.js` に ** 1 で作成したファイルを import する記述を追記してください。 **

#### 既存機能修正

- 機能名に則した名前のファイルがあるので、そのファイル内で修正を行ってください。

# webpack.config.js

webpack 用の設定ファイルです。

## エントリーポイントを増やすには

js ファイルを増やす場合は `config.js[num]` 内のオブジェクトを、  
css ファイルを増やす場合は `config.css[num]` 内のオブジェクトを、  
追記することで行えます。

例 :

```javascript
const config = {
    js: [
        {
            name: path.parse('./src/js/run.js').name,
            entry: path.resolve(__dirname, './src/js/run.js'),
            output: path.resolve(__dirname, '../common/js/')
        }
    ],
    scss: [
        {
            name: path.parse('./src/scss/master.scss').name,
            entry: {
                master: path.resolve(__dirname, './src/scss/master.scss')
            },
            output: path.resolve(__dirname, '../common/css/')
        }
    ]
};
```

↓

```javascript
const config = {
    js: [
        {
            name: path.parse('./src/js/run.js').name,
            entry: path.resolve(__dirname, './src/js/run.js'),
            output: path.resolve(__dirname, '../common/js/')
        },
        {
            name: path.parse('./src/js/top.js').name,
            entry: path.resolve(__dirname, './src/js/top.js'),
            output: path.resolve(__dirname, '../common/js/')
        }
    ],
    scss: [
        {
            name: path.parse('./src/scss/master.scss').name,
            entry: {
                master: path.resolve(__dirname, './src/scss/master.scss')
            },
            output: path.resolve(__dirname, '../common/css/')
        },
        {
            name: path.parse('./src/scss/top.scss').name,
            entry: {
                top: path.resolve(__dirname, './src/scss/top.scss')
            },
            output: path.resolve(__dirname, '../common/css/')
        }
    ]
};
```
