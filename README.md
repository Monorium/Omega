# Omega
OmegaはAndroid端末で操作できる6足歩行の虫型ロボット（オモチャ）です。  
自分でゼロから作りたくなり、ハード設計からソフト開発まで勉強しながら気長に製作中です。

## リポジトリについて
完全に個人的なバージョン管理に使用しています。  
閲覧や再利用は自由ですが、利用したことによる不利益や損害など一切の責任を負いませんので了承願います。  

## 使用リソース
### 主要ハードウェア
* Arduino Due
* ESP-WROOM-32
* Android端末
### 設計ソフトウェア
* Fritzing
* PlantUML
### ソフトウェア開発環境
* Visual Studio Code
* Arduino IDE
* Android Studio
* Inkscape
### プラットフォームというか開発言語
* C++（Arduino）
* Micropython
* Cordova（with Onsen-UI）

## 実装機能（予定順に記載）
|タグ|機能|
|:-:|:--|
|-|サーボ個別制御（6個、Arduinoシリアル通信）|
|0.0.2|サーボ動作スピード制御|
|0.0.3|Wi-Fi通信|
|0.0.4|サーボ個別制御（全18個）|
||microSDでマスターデータ|
||16方向制御|
||左右回転制御|
||16方向と回転制御の複合|
||ポージング制御（Android側機能）|
||Android端末の傾きで16方向制御|
||ジャイロ搭載（Android端末の向きで回転制御）|
||カメラ搭載（Android端末でストリーミング再生）|
||VRカメラ搭載（このオモチャに乗るんです！！）|

## ライセンス
[MIT](https://github.com/Monorium/Omega/blob/master/LICENSE)です。

## 利用ライブラリ（決めたら必ず書きます）
* [ArduinoJson (Benoit BLANCHON)](https://github.com/bblanchon/ArduinoJson)
* [cordova-icon (Alex Disler)](https://github.com/AlexDisler/cordova-icon)
* [Cordovarduino (Xavier Seignard)](https://github.com/xseignard/cordovarduino)
* [MicroWebSrv (Jean-Christophe Bos & HC²)](https://github.com/jczic/MicroWebSrv)
* [QList (Martin Dagarin)](https://github.com/SloCompTech/QList)
