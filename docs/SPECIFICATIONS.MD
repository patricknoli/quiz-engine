# React Quiz Engine - Specifications

### Why Vite?
Beyond all Vite advantages listed on its [docs](https://vitejs.dev/guide/why.html) I've decided to use it because of its easily config considering the pre-built templates. This help to not waste time on webpack configurations to directly focus on the App implementation itself. 

### Why Typescript?
In my opinion a typed code helps on maintenance and also facilitates the code reading and the understanding of each context inside the application, specially in this case that we depends on JSON files which need to be well specificated.

### Why styled-components?
For this application the styled-components was used for two main reasons:
1 - The possibility to use a Sass-like syntax without the need of configuring pre/post-css on webpack
2 - Use of props for example on the Progress bar component which have a dynamic width, with this solution we avoid to insert css styles inside the tsx code.
+Plus: Visually see the component blocks turning the code more semantic and readable.

### Future implementations
This Quiz engine brings the core features and well serve its purpose. To improve the application I would add a dynamic import of the .json files, eliminating the need to manually add new json references at Home (select) component.