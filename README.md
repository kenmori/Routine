# 初めてReactNative for Webで実装してみて

更新日時: 2018/7/25
![ReactNative-for-web](https://kenjimorita.jp/wp-content/uploads/2018/08/37699ECD-106B-4D3F-BA3A-285721879EF2.jpeg)

## 対象
- Reactは知っている
- ReactNative(以下RN)を触ったことがなく、ReactNative for Web(以下RNW)で実装したい

## この記事の概要

RN、RNWを「初めて」実装するにあたり、

必要な知識と、解決方法を記している

CreateReactApp(以下CRA)から作るかCreateReactNativeApp(以下CRNA)から作るのか私感と、

実装していて思ったことをつらつらと書いている

## Index

- 0.前提
- 1.フォルダ構成
- 2.RNW
- 3.RNWを実装するにあたりCRNAとCRA、どちらで作ったほうがいいか
- 4.実装を始める前に
- 5.WebとNativeでの分岐方法
- 6.開発方法の違い
- 7.使えるコンポーネント
- 8.Android開発
- 9.デバッグ
- 10.困ったこと解決したこと
- 11.その他
- 参照記事
- 謝辞
- author

## 0. 前提

```
node 8.11.1 npm 5.6
yarn install
json-server db.json
yarn ios or yarn web

expoがインストールされていること
実機確認
- AppStore でExpo Client or expoと検索。ダウンロード
```
### 0-1 RN周辺の登場人物

#### 0-1-1 [Expo](https://docs.expo.io/versions/v28.0.0/introduction/)

JavaScriptでnativeをビルドできるライブラリとサービスのセットツール

#### 0-1-2 ExpoSDK

ExpoSDKは参照を提供する。コンポーネントのようなイメージ。

カメラやソーシャルログインなどの機能的なシステムへ参照。

SDKはexpo(npm package)によって提供され、

npm install --save expoでインストールされる

```js

import {Contacts} from 'expo'
or
import Expo form 'expo'`

```
[ExpoSDKモジュール](https://docs.expo.io/versions/v28.0.0/sdk/)をインポートできる

#### 0-1-3 [ExpoXDE(Expo Development Environment)](https://docs.expo.io/versions/v28.0.0/introduction/xde-tour)

ローカルデベロップツール。プロジェクトをこちらから作ったり、ビルドやパブリッシュするために使う。

XDEでもプロジェクトを作るとreact、react-native、expoをインストールする。


#### 0-1-4 expo

XDEの代替ができるコマンドラインcli。

いくつかのExpoの機能はこれを使うことを必須としている。

#### 0-1-5 ExpoClient

開発したアプリをデバイス上でopenするツール。

シュミレータとエミュレータにはインストールしないでいい。

XDEかexpoでプロジェクトをサーブするとExpoClientでプレビューできるURLを生成する。

AndroidではExpoClientはexpo.io上の他のprojectも描画できたりする

ExppoClientはデバイス上、シュミレータ、エミュレータ上で動く。

CRNAはプロジェクトに設定されたExpoClientによってサポートされたRNの最新バージョンをサポートする

ExpoClientはRNがバージョンアップされた1週間後ぐらいにそのバージョンをサポートする

#### 0-1-6 Genymotion

Andoriodエミュレータ。

仮想デバイスを作り出す。ドキュメントではNuxus5、バージョンは任意がオススメとされている。

オラクルvirtualBoxを利用していて、もしまだインストールしていなければ使う際にインストールする必要がある


## 1.フォルダ構成

[納品先から許可をいただいたので徐々にgithub上にあげます](https://github.com/kenmori/Routine)

### 1-1 camera-with-native
- カメラロールを実装したプロジェクト

### 1-2 hybrid-app-native
- CRNAからの作られた基盤だけの雛形

### 1-3 hybrid-app
- CRAからの作られた基盤だけの雛形

Web対応する際は設定が必要

- package.json内
 - jest-expo
 - react-native-scripts(Webからnativeのコードを実行するためのmodule)
 - mainの記述変更(mainはnativeのentryポイントを渡す)

 - react-nativeを動かすためのpackage(互換性のあるバージョンで指定している。バージョンをあげる際は慎重に)
・expo@^25.0.0(app.jsonに記載) react-native@0.52.0 react-native-web
[バージョンを合わせる必要がある](https://docs.expo.io/versions/v28.0.0/sdk/#sdk-version)

 - .watchmanconfigを追加
コードからシュミレータへの即時反映を提供している
 - app.jsonを追加(app.jsonは、コードに属していないアプリケーションの部分を設定するためのもの。)

- src内
 - プロジェクト直下にApp.test.jsを追加(RNのエントリーポイントテスト。名前は変えないこと)


```js
//package.json内でmainに渡しているファイル内
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



## 2.RNW

RNのコンポーネントとAPIをReactDOMを使ってWeb上で利用できるようにしたもの
- 書いたコンポーネントはプラットフォームを選ばない
- ベンダープレフィクスのサポート
- touch,mouse,keyboradなどのインプットモードをサポート
- ReactDevToolsによる開発
- RTL(Right-to-Left)アラビア系言語のサポート

[使えるComponentとAPI](https://necolas.github.io/react-native-web/storybook/?selectedKind=Components&selectedStory=ActivityIndicator&full=0&addons=0&stories=1&panelRight=0)

サポートしているブラウザ
```
Chrome, Firefox, Edge, Safari 7+, IE 10+.
```

hoge.web.js内でRNが提供しているものを使う場合

RNWが提供しているコンポーネントしか使えない。

つまりRN <- RNW <- 共通のところでjsで使えるもしくはweb.jsで使える。

多くはView、Textになると思う。

ViewやTextはブラウザ描画でdevやspanに置き換わる

共通のコンポーネント内でもPlatformで分岐すればいいので、あまりこだわらないでいい

それよりはexpoのコンポーネントがどこまで実装したい機能として使えるのか、

ネイティブの機能がどこまで使えるのかを知ることの方が

大事な印象。

なぜならそれによってネイティブエンジニアのアサインが必要になるかもしれないし

Webは別機能で、別ライブラリで近いことを実装しましょうで解決できる気がするから。(今回のカメラロールとドロップファイルのように)

開発するにあたっての学習コストの使い方は

Native開発の知識 > RNの知識 > RNWの知識

という順番な印象

**特定のタグにしたい場合**

```html
<View accessibilityRole="article" /> => <article role="article" />
<Text accessibilityRole="link" /> => <a role="link" />
```

と書く必要がある



共通化しているところ(containerなど)では下記のことが注意する必要がある。


- div、pなどは使えない
- Text > Link　はエラー。 Link > Text
- ul > li は FlatListのdata、renderItem(propsにmap)で表現する


```js
Link
//work web, but don't work Native
<Link>Hoge</Link>

//ok
<Link><Text>Hoge</Text></Link>
text

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

- RNでhtmlタグを記述する場合createElementを使ってtagを作ることができる


**感想**
- 共通化しなければRNWはそんなに気にしなくていい。
web.js内で分けて記述すればいい。
- こっちではエラー、こっちでは表示されているみたいなことが多い→RNのコンポーネントがwebに対応しているか、

Webの記述をnative記述に置き換える修正ul -> FlatList
など

### 2-0

styleはRNで定義されている

[View Style](https://facebook.github.io/react-native/docs/view-style-props#backgroundcolor)

例えば

```js
  <Button
  style={styles.buttonColor}
  />

const styles = StyleSheet.create({
  buttonColor: {
    backgroundColor: "red",
    color: "#fff"
  }
});
```
これは効かない
[Buttonに渡せるpropsを確認する](https://facebook.github.io/react-native/docs/button)


```Color of the text (iOS), or background color of the button (Android)```

なので

colorはiosだとtextに、androidだとbackgroundにスタイルされる

```js

<Button
color="#2196f3"
/>
```
とする必要があるし
何かRNのコンポーネントでスタイルしたい場合、
Viewでラップしてスタイルする
例えば、

```js
<View style={style.some}>
<Button
color="#2196f3"
/>
</View>
```

### 2-1
RNWはCRAとCRNAでデフォルトで対応されている

CRNAの`hybrid-app-native`では`webpack.config.js`の`L1120`にある`'react-native': 'react-native-web'`

は

nativeの処理をwebに渡している(react-nativeのコンポーネントをimportすればract-native-webのそれをimportしたことになる)

CRAでは同じことを`node_modules/react-scripts/のconfig。webpack.config`内でやっている

実装ではあまり設定を気にすることはない

## 3.RNWを実装するにあたりCRNAとCRA、どちらで作ったほうがいいか

CRNA。
CRAより設定の手間がない。


## 4.実装を始める前に

どのような機能を持ったWebAppを作りたいかが重要

ネイティブコードをいじる可能性があるならexpoに頼らずxcode、AndroidStudioで作ることになるので

用意が変わってくる

RNWは前述のようにRNのコンポーネントを使えたら使えるようにするだけなので

どちらかというとRNでの開発経験やネイティブの知識が重要になってくることがわかる


## 5.WebとNativeでの分岐方法

分岐の方法は2種類で

・ファイル拡張子を変える

・コード上で分岐する
がある

Moduleを共通化したい場合

[react-native-web/#compatibility-with-react-native](https://github.com/necolas/react-native-web#compatibility-with-react-native)

を参照して、どのModuleが共通化できるか確認する必要がある

`CameraRoll`の場合RNWとRNで互換性はないので共通化できないので分岐する必要があることがわかる

分岐の方法は以下。

### 5-1.ファイル拡張子で分岐

`hybrid-app-native/src/common/`
の
`Routing.native.js`

`Routing.web.js`

のように

拡張子をnativeとwebで分けることによって

プラットフォームがそれぞれ実行時に適切なファイルを見る
そのwebpackが解決している箇所は下記

`webpack.config.js  extensions: ['.web.js', '.js']`

注意点は、

exportする際のオブジェクト名を同じにしてimport時に同じ名前を呼び出すこと

例えば共通のものを親Componentで呼ぶ際には


```js
import { Timer, Clock } from '../common/Timer'
```

とimportして

`Timer.web.js`

`Timer.native.js`

内で同じ名前`Timer`を`export`すること

今回`react-router-native`と`react-router-dom`がそれをしている


### 5-2.コード上で分岐

Platformを使う

```js
import { Platform, View, Text, StyleSheet, Button } from "react-native";
<Text>{Platform.OS === "web" && "web is here"}</Text>
<Text>{Platform.OS === "ios" && "ios is here"}</Text>
```

RNのカメラはimage-pickerのライブラリがあるが、
それはexpo配下では使えないため(nativeコードをいじる必要がある)
expoが提供しているAPIを使うことになる

## 6.開発方法の違い

ざっくり3つの道がある。

CRNAにはexpoがデフォルトで入っている。
expoはRNで使われている開発やビルドを助けるツール。

expoに乗っ取って作るかexpoをejectするかでその先の開発でできることが変わる

### 6-1.expoで作る
- expoを通してクラウド上でビルドできる
- すぐにデプロイできる
- ホットリロードで開発できる。
- ExpoプロジェクトはiosやAndroidフォルダがなく
100%JavaScript。これは自分自身でビルドすることはできないことを
意味している
- Expoのオープンソースコンポーネントが使える
- ExpoAppはhostアプリケーションの中で実行され、
app storeから独立して更新をpushできる
新しいビルドを行うことなくコードを公開することを意味する
- AppleDeveloperAccount($99/year)なしにテストできる

### 6-2.expoをejectしてNaitive(ejecting)で作る
  react-native initで作られるprojectのことと同じ方法になる

- iOSとAndroidのプロジェクトをフォルダに含む
- XcodeやAndroidStudioでビルドできる
- JavaScriptでかけるがカスタムする際はnativeCodeをいじる
- 利用可能な多くのコンポーネントを使用できる

eject後も、Expokitというライブラリで必要なcomponentを使うことができ、

全てnativeComponentに置き換えることはしないでもいいし完全にnativeに行くこともできる

### 6-3. 最初からRN init で作り、for Webにも対応させる

[Sharing Code between React Web and Native Apps](http://jkaufman.io/react-web-native-codesharing/)

```
npm install -g react-native-cli
react-native init [AppName]

```
後、トップレベルにweb階層を作る。

```create-react-native iniit```をした後expoをejectして作った方が楽そう



**expoはどのように実行しているのか**

RNはJSで実行しているコンパイル済みのアプリ。

RNプロジェクトをbuildし、実行すると、PakagerがMetroという名前で起動する。

packagerは下のことをする

- 1.全てのJSコードを一つのファイルに結合し、デバイスが解析できないJSXや新しいJS構文を変換する
- 2.Imageコンポーネントによって描画できるようにassetsをオブジェクトに変換する

Expoを使わない場合
```
react-native start
```
Expoを通すと

```
exp start
```

これらはpakagerを立ち上げている
違いは
exp startはExpo Development Serverというものを呼び出す。
このサーバーはRNのpackager(Metro)によって作られたJavaScriptバンドルを取得し、
Expo appのsimulator上で実行するプロセスを実行します。


**expoで作るAppをpublishする**

ユーザーはexpoをダウンロードして
、その中で作られたアプリを実行する
提供されて作ったアプリのurlを介して

```
exp publish

```

## 7.使えるコンポーネントの選び方

実装している最中にこの機能が使いたいと思い、

それはRNWでできるのかexpoのコンポーネントなのか、RNから引っ張ってくるのか選択するケースがある

その場合注意しなくてはいけないのが、

react-native-linkのこと。

### 7-1.react-native-link

[react-native-link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)

ReactNativeライブラリで使いたいライブラリがnativeコードに依存しているものもあるので

それを使いたい場合linkコマンドを打つ必要がある。

その場合expoをejectしなければならない。


具体的にいうと
RNで使える全てのライブラリは

[ここ](https://github.com/facebook/react-native/tree/master/Libraries)

にあるが、

いくつかのライブラリは純粋なJavaScriptだがいくつかのライブラリはネイティブコードに依存している。

そのライブラリを使う場合、


```
react-native link [packagename]
```

を打ち、

アプリケーションにインストールする必要がある


[参照:"react-native link" は何をするか](https://qiita.com/lazyppp/items/8d5969cd9a5b53587e18)

(linkコマンドはnativeプロジェクトの中にインストールされたnode packageをinstallするコマンド。それはNativeProjectでのみ起こすことができる)

例としてある人は、

AppleMapかGoogleMapをiOS上で使えるreact-native-mapsを使いたかったが

linkコマンドを実行しなくてはいけなかった。

この場合ejectする必要がある

機能を追加する際はその仕様がExpoだけでいけるのかnativeもいじることになるのかを

先に調べて実装する必要がある


## 8.Android開発

[AndroidSDKとgenymotionを使って開発する](https://docs.expo.io/versions/v28.0.0/workflow/genymotion)
or
実機にexpoをインストールして開発する

### 8-1 AndroidSDKとgenymotionを使って開発する

[AndroidStudio](https://developer.android.com/studio/)
から
AndroidStudioをダウンロード

```
AndroidStudio -> Configure -> SDKmanager

```
でAndroid Locationのパスを確認
多くの場合下記

```/Users/{username}/Library/Android/sdk```


使っているshellにそのパスを通す
自分の場合.zshrcに以下を追加
```
export PATH="$PATH:/Users/moritakenji/Library/Android/sdk/platform-tools"
```

更新
```
source ~/.zshrc
```

adb([AndroidDebugBridge](https://developer.android.com/studio/command-line/adb?hl=ja))をターミナル上で確認

```
adb
```
次に
genymotion(Androidエミュレータ)をdownload、連携させる

こちらはからダウンロード
[genymotion](https://www.genymotion.com/download/)

genymotionにAndroidStudioToolsの先ほどのパスを認識させる

genymotion > setting > ADB

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/66.png" width="200"/>

adb-serverのバージョンとSDKのバージョンが合っていないとエラーになるので注意

### 8-2 実機にexpoをインストールして開発する

googlePlayからexpoをダウンロード
yarn androidでexpoのQRコードスキャンで確認する。




## 9.デバッグ


### 9-1 react-devtoolsを使う

[react-devtools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools)


```
npm install -g react-devtools
```

run

```react-devtools```

もしWaiting for React to connectが出てきたら

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/141.png" width="200" />

ここをコピペして

index.htmlにぺ

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/20.png" width="200" />

sumilator上でcmd + d, reload bundle

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/211.png" width="200" />

出てきます

### 9-2 simulatorが立ち上がった状態でchrome devtoolsと併せてデバッグする

simulatoreが立ち上がっている状態で

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/cmdD.png" width="200" />

Cmd + D

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/debugg.png" width="200" />

Debug Remote JS


開発ツールを立ち上げて
該当のソースを参照する

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/54.png" width="200" />


## 10.困ったことと解決したこと

### 10-0 コードを変更したのにsimulatorのexpo上でhot-reloadされない

cmd + d でReload JS Bundle

その画面上部のRefreshを押下

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/15.png" width="200" />

### 10-1 Invariant Violation: View config not found for name input

どちらのプラットフォームにも気を使いながら開発する
WebとRN同時に開発していると
コードを変更した際に当然Webとnativeプラットフォームも更新されます。

例えばWebでinputタグを使っていても

RN側では静かにエラーになっています


<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/0c0bdfd4cae61bb3e50ea9650a4bb1c7.png" width="200" />


```
Invariant Violation: View config not found for name input
```

この場合、View configの中にinputという名前のものはないよといわれています。
また

```
This error is located at:
in input (at Photo.js: 10)
```
とあるのでそこで互換性のない記述がされているかもしれません

今回の場合
inputがtype属性がtextならTextInputをreact-nativeから呼んで使うことで解決します

### 10-2 Remote debugger is in a background tag which may...

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/52.png" width="200" />

デバッガーを立ち上げた際にでる

```
Remote debugger is in a background tag which may cause apps to perform slowly.
Fix this by foregrounding the tab
```
いくつかのlocalhostを開いているタブを閉じてください`

### 10-3 Runtime is not ready for debugging. Make sure Packager server is running

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/53.png" width="200" />

```Reload JS```を押下
or
```yarn ios```(serverをたちあげる)

### 10-4 Uncaugt RefferenceError: regeneratorRuntime is not defined

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/121.png" width="200" />

```
node -v
v6.10.2
```

だと出るエラー```nvm use --lts```で最新のnodeを使ってください

### 10-5 App could not be found

```
Unable to resolve ../../../../App" from ".//node_modules/react-native-scripts/build/bin/crna-entry.js`: The module `../../../../App` could not be found"
```

立ち上がっているsimulator上で```cmd + d```, ```Reload JS Bundle```してみる

### 10-6 There was a problem loading the requested app.
simuratorを立ち上げる前にyarn iosするとでる(これは期待しない)

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/14.png" width="200" />

terminalでもエラーになっている

```
Failed to start simulator:
Error: Process exited with non-zero code: 60
Exiting...
````
<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/ca1aac4a7317d460670099c8ea5b6999.png" width="200" />

もう一度```yarn ios``` すればとりあえず治る

### 10-7 実機expoが同期してくれない

PCのIPアドレスと実機のIPアドレスの相違を疑う

[https://qiita.com/noraworld/items/264d944f3ac8074e454d](https://qiita.com/noraworld/items/264d944f3ac8074e454d)

### 10-8 console.error: "uncaugt at check, "call: argument fn is undefined"

```
yield call(post, formData)//call内のpostが適切か確認
```

### 10-9 adb server version (39) doesn't match this client (40); killing...
AndroidSDKとadbのバージョンが合っていない

### 10-10 Error running adb: No Android device found. Please connect a device and follow the instructions here to enable USB debugging:

もしGenymotionを使っている場合、
SDKへのパスをGenymotionのABDへ渡すか、実機で検証する

### 10-11 もしsimulatorの動作が遅かったら

debug -> Slow Animationsのチェックを外す

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/19.png" width="200" />

## 11.その他

### 11-1 コマンド一発で雛形web,nativeを作ってくれるツールはないのか
[create-react-native-web-app](https://github.com/VISI-ONE/create-react-native-web-app#readme)

### 11-2 htmlを文字列として書いてViewするライブラリ
[react-native-htmlview](https://github.com/jsdf/react-native-htmlview#example)

### RNがどのようにコンポーネントをレンダリングするか

抽象的なレイヤーである「Bridge」を使ってnative widgetsとしてレンダリングする

Bridgeとは・・・ホストプラットホーム上のレンダリングAPIによって実行される

RNはメインスレッドをブロックすることなく、

プラットホームのJSエンジンを使用して、

別スレッドでアプリケーションを実行するレイヤー

<img src="https://kenjimorita.jp/wp-content/uploads/2018/07/ab888b27175037ecb17f031473b4e9f5.png" width="200" />
[参照](https://www.logicroom.co/react-native-architecture-explained/)


### 11-3 expoをFirebase上におく

expoで認証機能を作るとなるときついことがあるらしい。FireBaseなら簡単らしい

[参照](https://docs.expo.io/versions/latest/guides/using-firebase)

### 11-4 実装が難しくなったらアプリ上からWebBrowserを開かせるAPI

[WebBrowser](https://docs.expo.io/versions/v28.0.0/sdk/webbrowser)

### 11-5 expoでこんなことできるよのまとめ

[awesome-expo](https://github.com/expo/awesome-expo)

### 11-6 ReactNativeでできること

[【React Native】良さげなコンポーネント紹介](https://qiita.com/YutamaKotaro/items/052768ca01a6369a8ad5)

## 参照記事

- [React-native first impressions: Expo vs. Native](https://medium.com/@paulsc/react-native-first-impressions-expo-vs-native-9565cce44c92)

- [Linking Libraries](https://facebook.github.io/react-native/docs/linking-libraries-ios.html)

- [Understanding Expo for React Native](https://hackernoon.com/understanding-expo-for-react-native-7bf23054bbcd)

- [Understanding React Native Deployments](https://medium.com/react-native-training/understanding-react-native-deployments-6e54157920b7)

- [ReactNative Arcitecture:Explained!](https://www.logicroom.co/react-native-architecture-explained/)

- [React Native For Web: A Glimpse Into The Future](https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/)

- [JavaScript Environment](https://facebook.github.io/react-native/docs/javascript-environment.html)

- [accessibilityRole](https://github.com/necolas/react-native-web/blob/master/packages/website/guides/accessibility.md#accessibilityrole)

- [stackoverflow react-native-web](https://stackoverflow.com/questions/tagged/react-native-web)


- [ProjectLifecycle](https://docs.expo.io/versions/v28.0.0/introduction/project-lifecycle)

- [開発手順](https://docs.expo.io/versions/v28.0.0/guides/up-and-running.html)


## 謝辞

これを公開するにあたり[株式会社 m-Lab](http://mlabs.jp/)さんに御礼申し上げます

## author

[Twitter](https://twitter.com/bukostunikki?lang=ja)

[github](https://github.com/kenmori)

[ブログ](https://kenjimorita.jp)

