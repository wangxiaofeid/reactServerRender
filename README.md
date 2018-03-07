# reactServerRunder react服务端渲染案例（如果想用next.js版，切换到next.js分支）
技术栈： express react mobx react-router


```
// 调试模式启动
npm run dev
// 打包
npm run release
// 打包后启动
npm start
```

遇到的一些问题：
1. 服务端渲染出来的html和客户端第一次渲染的html不一致是会有警告
2. mobx的store转化成json时不能深度解析，使用mobx.toJS(store, true)也不行，自己做了层转化
3. 服务端使用match后，客户端也要使用match，不然渲染出来的html不一致，会有1的警告
4. 客户端使用match后点击其他页面后，html修改了url不改变的问题，使用mobx-react-router里的RouterStore，再对react-router的Link做一层封装，具体看代码
