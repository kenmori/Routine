
# this projct is reference
[Write once, run anywhere with Create React(Native) App and react-native-web @Yannick Spark](https://sparkyspace.com/write-once-run-anywhere-with-create-react-native-app-and-react-native-web/)


### json-server
json-server --watch db.json --port 3004

#### node 8.11.1 npm 5.6
#### react-create-app hybrid-app && cd hybrid-app
任意の名前のプロジェクトの生成。カレントをプロジェクトに

#### 必要なmoduleをyarnで追加
・babel-plugin-transform-object-rest-spread
・babel-plugin-transform-react-jsx-source
・babel-preset-expo
・jest-expo
・flow-bin(flow実行コマンド群)
・react-native-scripts(Webからnativeのコードを実行するためのmodule)
・react-test-renderer@16.2.0 (jestのスナップショット機能)

react-nativeを動かすためのpackage(互換性のあるバージョンで指定している。バージョンをあげる際は慎重に)
・expo@^25.0.0 react-native@0.52.0 react-native-web

#### .babelrcを追加

#### .watchmanconfigを追加
コードからシュミレータへの即時反映を提供している

#### .flowconfigを追加

#### app.jsonを追加

#### プロジェクト直下にApp.test.jsを追加(ReactNativeのエントリーポイントテスト。名前は変えないこと)

#### プロジェクト直下にApp.jsを追加(ReactNativeのエントリーポイント。名前は変えないこと)

#### package.jsonにnativeを実行するためのコマンドを追加


### PhoneGap/CordovaではなくRNなのはなぜ？
nativeのコンポーネントをJavaScriptから呼び出して使うアプローチなの性能が良く、高速に動く




#### platform-agnostic(不知論者)
ドキュメントに書いてある意味。不知論者なのでrenderDOMはいらない





・mainの記述変更
mainはnativeのentryポイントを渡す

```js
//react-native-scripts/src/bin/crna-entry.js

import Expo from 'expo';
import App from '../../../../App';
import React, { Component } from 'react';
import { View } from 'react-native';

if (process.env.NODE_ENV === 'development') {
  Expo.KeepAwake.activate();
}
Expo.registerRootComponent(App);//Expoに対してmainコンポーネントを設定している
```
Expoに対してAppをroot登録している(native側のエントリーポイントの名前を変えない理由)



#### webpack.configはどこ？
```node_modules/react-scripts/```
```
  ▾ react-scripts/
    ▸ bin/
    ▾ config/
      ▸ jest/
        env.js
        paths.js
        polyfills.js
        webpack.config.dev.js
        webpack.config.prod.js
        webpackDevServer.config.js
  ```


以前のRNWのverは[babel-plugin-react-native-web](https://github.com/necolas/react-native-web/blob/master/packages/babel-plugin-react-native-web/src/index.js)を使っていたが、そこでやることを
webpack.configに記述している。
aliasを指定して、react-native記述でreact-native-webを呼び出している
[ここ](https://github.com/facebook/create-react-app/blob/991b092c893b916e6fd34e408e96a395d47b6008/packages/react-scripts/config/webpack.config.dev.js#L108)でnative処理をwebに渡している
crate-react-appはdefultでこれに[対応](https://github.com/facebook/create-react-app/pull/407)しているので記述の必要はない



### 動く仕組み
react-native-webのプラグインがRNをimportしている箇所をformでreact-native-webに変換している
そのRNWのコンポーネントView Textがdivやpを最終的に描画している

### 作り方
[ここ](https://necolas.github.io/react-native-web/storybook/?selectedKind=Components&selectedStory=ActivityIndicator&full=0&addons=0&stories=1&panelRight=0) 

・公式が提供しているコンポーネントとstorybookを比べて使えるものを探す。RNが提供していてRNWが実装していないものを使うと基本的にエラーは出ないがViewが変な感じになる
[ここ](https://github.com/necolas/react-native-web/blob/master/packages/babel-plugin-react-native-web/src/moduleMap.js)にあるものだけだと思われる。


・iOS/Android/Webの分岐が必要になる [公式](https://github.com/necolas/react-native-web/blob/master/website/guides/getting-started.md#web-specific-code)
・routerはRNではreact-router-native、RNWではreact-router-domを読み込むため取り込むcontainerではファイルは分岐が必要
・RNのコンポーネントライブラリがiOS/Androidのネイティブに依存していたらWebでは使えない。RN標準のコンポーネントで組み合わせていたらRNWで使える
互換性があるcomponent
[https://github.com/necolas/react-native-web#compatibility-with-react-native](https://github.com/necolas/react-native-web#compatibility-with-react-native)


create-react-app内の該当箇所にに記述があるurl
https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/


### RNW YouTube
https://www.youtube.com/watch?v=tFFn39lLO-U&feature=youtu.be


### re-start
[https://medium.com/@amoghbanta/write-once-use-everywhere-with-react-native-d6e575efe58e](https://medium.com/@amoghbanta/write-once-use-everywhere-with-react-native-d6e575efe58e)
https://github.com/react-everywhere/re-start


### 知見
・Webpack configuarionsはwebのみをCompile、appを実行する。nativeの方はそれ自体を自身でやる
・[react-nativeのpresetsを通して、WebとNativeでBabelの設定を分ける必要がある](https://medium.com/@Or_yoffe/building-a-platform-agnostic-app-react-native-and-web-c0e82cbdda8)(未確認)
・react-nativeでhtmlタグを記述する場合createElementを使ってtagを作る必要がある
・テストが大変らしい




・div、pなどは使えない
・共通化する場合同じフォルダにHoge.web.jsとHoge.native.jsを置いておき、読み込むライブラリはそれぞれ対応した者にして、exportするオブジェクトを同じ名前にする。
使うところでは共通の名前で使うが、参照しているのはRNとRNWで違うところをみている
それぞれ拡張子はwebpackが解決してくれる



### react-native
・Text > Link　はエラー。Link > Text
・ul > li は FlatListのdata、renderItem(propsにmap)で表現
・こっちではエラー、こっちでは表示されているみたいなことが多い→RNのコンポーネントがwebに対応しているか、Webの記述をnative記述に置き換える修正ul -> FlatList

### expoとは

PCで開発
https://github.com/expo/xde
から
macリンクからEXpo XDEをダウンロード
[追加](http://kenjimorita.jp/wp-content/uploads/2018/06/4f81a4ebe037ef12bb2fe6c55639c745.png)



TODO
### expoを使い方をマスターする

expoを使わない場合
[RNのドキュメント](https://facebook.github.io/react-native/docs/getting-started.html)のBuilding Projects with Native Codeから始める

### file upload photo
[https://github.com/g6ling/React-Native-Tips/tree/master/How_to_upload_photo%2Cfile_in%20react-native](https://github.com/g6ling/React-Native-Tips/tree/master/How_to_upload_photo%2Cfile_in%20react-native)

#### watchman.config


#### ejectした場合どうすれば良いか

### 共通で使えるものは何か

### ２〜３画面遷移できて、ルーティングとコンポーネントで構成して、saga使ってる状態的


### リアクトネイティブで作ったコンポーネントをwebで使う場合は、こんな感じで使いますってきなサンプル


### リアクトネイティブとreactwebの開発を効率よく行うためのベース作成。コンポーネントはこうすると共通化できる。とか。ここは共通化できない

### react for webについての記事を書いてください

### react native for web では、redux-sagaが使えなくて、これが必要とか routerはこのモジュールでこう使うとか ＋であると嬉しいのは、これをアプリ化する場合は、こうやるっぽいところまであると嬉しいです。











### 共通化

#### Link

 ```js

//work web, but don't work Native
 <Link>Hoge</Link>

//ok
 <Link><Text>Hoge</Text></Link>
 ```

 text

 ```js
 //error 「text cannot be used outside of a <Text>...
 <View>
    {count}
 </View>

 //ok
 <View>
   <Text>
      {count}
   </Text>
 </View>

 ```


### 分岐

```js
import {Platform} from 'react-native'

    <Text>{Platform.OS === "web" && "web is here"}</Text>
    <Text>{Platform.OS === "ios" && "ios is here"}</Text>
```

https://www.reddit.com/r/reactjs/comments/7ymur0/reactjs_or_reactnativeweb/

````
ファイルで分ける

plat.native.js
plat.web.js

にすれば、読み込むプラットフォーム側で解決してくれる
export する名前を同じにすること
```

### RNWとは
RNのコンポーネントやAPIをreact-dom上で使えるようにしたもの
・UIのクオリティーをあげている(実行速度、UIの操作性mouse, keyboad, tap)、ベンダープレフィクスなどのstyleを最適化、Devツールの統一
・一度書けばどこでもrenderできる




##TODO 最初から説明している
# Androidの開発環境セットアップ

### 1 インストール
https://developer.android.com/studio/
Android StudioとSDKをインストール


### 2 環境変数にANDROID_HOMEを登録する
コマンドラインからSDKが利用できるように、環境変数にANDROID_HOMEにAndroid SDKのパスを設定する
Android SDKのパスを調べるにはAndroid Studioを起動する
初回は
Start a new Android Studio projectから
適当にプロジェクトを作成

Tools > Android > SDK Manager
パスがわかったら環境変数をOSに登録する

 ~/.bashrc
 などお使いのshellに合わせて

````
#export ANDROID_HOME = (path)
export ANDOROID_HOME =/Users/hogehoge/Library/Android/sdk
```

### 3 Android 6.0(API 23)以上をインストール


### 4 Androidの実行環境を用意する
Androidの実機を持っていない場合
AVD Managerを使ってAndroidエミュレータを作成する
Android Studio のAVD ManaegerはTools > Android > AVD Manager

実機の場合は アプリ設定 > 端末情報 > ソフトウェア情報 ボルド番号を7回タップする
開発向けオプションが表示されるのでON
USBデバッグをON
PCと実機を繋げる


#### 5 Androidの実機とPCで通信するように設定
USBでPCとAndroidを繋ぐと通信ができる
次のコマンドはAndroid側とPCで通信を行うことだできるコマンド。
````
adb reverse tcp:8081 tcp:8081
```
でエラーが出る場合。
adbはANDROID_HOMEのパス以下platform-toolsにある。
は接待ぱすで以下 (userはご自身の)
````
/Users/{user}/Library/Android/sdk/platform-tools/adb reverse tcp:8081 tcp:8081
```
### RNをインストール
brew install watchman

npm install -g react-native-cli

react-native init TestNative

cd TestNative

react-native run-android

####  create-react-native-appから作る方法



質問100


# RN はそもそもなに
ios androidに対してのswift、javaの記述を一つの言語、JSで抽象化、それぞれのプラットフォームで共通で使えるようにしたフレームワーク



### 作り方は？

### CRNAとCRAにおけるfor-webの扱いの違い


react-native-button

### 共通化できるところは？

使いたいRNのパッケージがネイティブの実装(iOS/Androidコード)に依存しないことが条件。
それを調べるには？
RNのパッケージのドキュメントにfor-Webの実装が必要だという記述があれば使えない
[https://github.com/necolas/react-native-web#compatibility-with-react-native](https://github.com/necolas/react-native-web#compatibility-with-react-native)

その場合
platform.OSの分岐を使って同じファイル内でコンポーネントを出し分ける


参照
[https://stackoverflow.com/questions/37429900/implementing-components-with-react-native-web](https://stackoverflow.com/questions/37429900/implementing-components-with-react-native-web)

### webpackはどのように実現させているの？？


### アプリ開発手法の違いは？


#### CRNAからforWebを扱う

1.  `create-react-native-app hybrid-app-native --with-web-support`

※[create-react-native-appは実験的にwebをsupportしている](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/getting-started.md#starter-kits)

これで
yarn web
yarn ios
などでどちらも開発できる

#### CRAからforWebを扱う

###  linkとは
[document](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)
JSコードのみで書かれたパッケージではなく、
nativeコードで実装されている依存ライブラリに対してインストールする際に指定する

`npm i hoge --save link`(packageに対してのlink)
これをしないとErrorになる

npm が自動でios, Androidのプロジェクトに対しての変更を自動でやってくれる

[https://qiita.com/lazyppp/items/8d5969cd9a5b53587e18](https://qiita.com/lazyppp/items/8d5969cd9a5b53587e18)

### 巷での噂は？
### アーキテクチャの違いは？

### リリースまでの準備は？
### 参照した記事は？

### forWebは独自で書いて、アプリはRNを使う
例えば[Buttonコンポーネント](https://facebook.github.io/react-native/docs/button.html)
を使いたい場合、必須propsと、plattformの項目をみて使えるアプリを確かめる

# expoについて
### expoとは
reactNativeの開発・ビルドを支援してくれるツール
オンラインやアプリで使用できる
・変更したコードをすぐに反映させてくれる
・環境構築をせず実機確認できる
・カメラなどのネイティブ機能を抽象的にしてexpoが提供してくれる(後述)
・xcodeやAndroidStudioなどでビルドしないでいい

### 具体的にexpoがnativeモジュールを抽象化して提供しているもの
[https://docs.expo.io/versions/v28.0.0/sdk/](https://docs.expo.io/versions/v28.0.0/sdk/)
RNとexpoのsdkのバージョンを合わせる必要がある

### ExpoSDKとは
ExpoAppはExpoSDKを含んだRNAppのことで、
ExpoSDKはデバイスのシステム(カメラやローカルストレージ、その他のハードウェア)への参照を提供しているNaitiveなJSライブラリだ。
このことはnativeコードを書くことやXcodeやAndroidStudioを使わないことを意味する
またExpoSDKを含む全てのnativeな環境で実行できるのでピュアなJSプロジェクトをポータビリティにさせることを意味している

ExpoもまたUIComponentを提供している


### expoを使うことで失うこと
・外部ライブラリが使えない。
・独自の実装をしたい時にネイティブコードが書けない(ejectのようにして管理から外れる必要がある)

### 使い方



### 開発する際に使うと良さそうなライブラリ

[react-native-elements](https://github.com/react-native-training/react-native-elements)
[ReactNativeExpress](http://www.reactnativeexpress.com/)

### mac上でAndroidのシュミレータ環境構築
[https://bagelee.com/programming/react-native/react-native-1/](https://bagelee.com/programming/react-native/react-native-1/)

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```






`
参照: https://qiita.com/nacam403/items/2c4a055132c89c3e63fb


### 開発方法

yarn start i でiOS シュミレータが動く


### camera

web: [https://www.npmjs.com/package/react-webcam](https://www.npmjs.com/package/react-webcam)
native: [https://blog.pusher.com/getting-started-react-native-part-3/](https://blog.pusher.com/getting-started-react-native-part-3/)

[](https://qiita.com/Nkzn/items/8e31efe0ebafa8038bde)



### debug
https://github.com/jhen0409/react-native-debugger




