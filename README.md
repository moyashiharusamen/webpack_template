# 概要

webpack のテンプレート用リポジトリです

# 使用ツール

## モジュールハンドラ

webpack

## メタ言語

SCSS

## JavaScript トランスパイラー

Babel

# 注意点

モジュールハンドラを使用し、各ファイルを変換しております。  
**修正する（手を加える）ファイルは `/_dev/` 配下のみ** にしてください。  

# Linter

以下を使用しております。

- **[eslint](https://eslint.org/)**
- **[sass-lint](https://github.com/sasstools/sass-lint)**

# 開発環境

コマンド ` $ hogehoge ` を打つというのは、 **hogehoge と打つ** という意味です。  
先頭の `$` は **コマンドへの入力** を意味します。

## 構築

1. package.json がある階層に Git Bash, Command Prompt, PowerShell などで移動してください。
2. 以下のコマンドを実行してインストールを開始ください。黒い画面内でインストールが完了しており、 `node_modules` というディレクトリが作られていれば良いです。

```
$ npm install
```

or

```
$ npm i
```

## 実行

環境構築後に以下のコマンドを実行して起動してください。  
※ webpack の詳しい使用方法は [こちら](/webpack/_dev/README.md) をご参照ください。

```
$ npm run dev
```

and

```
$ npm run build
```

# ディレクトリ構造

```
├─_dev
│  ├─src
│  │   ├─js
│  │   └─scss
|  ├─package.json
|  └─webpack.config.js
├─.browserslistrc
├─.editorconfig
├─.eslintignore
├─.eslintrc
├─.gitignore
└─.sass-lint.yml
```

## _dev

開発環境用のディレクトリです

- /src/
    - js, scss の修正する対象のファイルが入っています
- package.json
    - npm コマンドの情報管理用のファイルです
- webpack.config.js
    - webpack の設定用ファイルです

## .browserlistrc

node package の **[autoprefixer](https://www.npmjs.com/package/autoprefixer)** の設定ファイルです。  
[Can I Use](https://caniuse.com/) の情報をもとにベンダープレフィックスを付与してくれます。

## [.editorconfig](https://editorconfig.org/)

node package の **editorconfig** の設定ファイルです。  
インデント、改行コードなどの設定をエディタをまたいで行えます。

## [.eslintrc](https://eslint.org/)

**eslint** 用の設定ファイルです。

## .eslintignore

**eslint** の除外用設定ファイルです。

## .gitignore

**git** の監視下からの除外用設定ファイルです。

## .sass-lint.yml

**sass-lint** 用の設定ファイルです。
