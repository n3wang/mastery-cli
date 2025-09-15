
> [!NOTE] Cannot be used
> The following cannot be used


https://github.com/codingminecraft/MarioYoutube/tree/master

https://www.youtube.com/watch?v=025QFeZfeyM

https://www.lwjgl.org/customize

![[Pasted image 20250216133642.png]]


```java
project.ext.lwjglVersion = "3.3.6"
project.ext.jomlVersion = "1.10.7"
project.ext.lwjglNatives = "natives-macos"

repositories {
	mavenCentral()
}

dependencies {
	implementation platform("org.lwjgl:lwjgl-bom:$lwjglVersion")

	implementation "org.lwjgl:lwjgl"
	implementation "org.lwjgl:lwjgl-assimp"
	implementation "org.lwjgl:lwjgl-glfw"
	implementation "org.lwjgl:lwjgl-openal"
	implementation "org.lwjgl:lwjgl-opengl"
	implementation "org.lwjgl:lwjgl-stb"
	runtimeOnly "org.lwjgl:lwjgl::$lwjglNatives"
	runtimeOnly "org.lwjgl:lwjgl-assimp::$lwjglNatives"
	runtimeOnly "org.lwjgl:lwjgl-glfw::$lwjglNatives"
	runtimeOnly "org.lwjgl:lwjgl-openal::$lwjglNatives"
	runtimeOnly "org.lwjgl:lwjgl-opengl::$lwjglNatives"
	runtimeOnly "org.lwjgl:lwjgl-stb::$lwjglNatives"
	implementation "org.joml:joml:${jomlVersion}"
}
```


---
### Capstone Project

A Rogue Fight Game that also has multiplayer as an option. With the ai, similar. 