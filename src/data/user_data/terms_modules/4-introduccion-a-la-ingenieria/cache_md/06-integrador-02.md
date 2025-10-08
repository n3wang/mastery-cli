
# Sistema Agrícola Autónomo
###### Nelson Wang

## Introduccion
Existen muchas regiones con condiciones naturales favorables para la agricultura pero que no logran desarrollar su potencial productivo. Las razones principales esta puede ser por ausencia de personal con los conocimientos técnicos, prácticas agronómicas adecuadas y acceso a tecnología moderna en estas regiones.

Este proyecto podria usarse para aprovechar el 21 porciento de la tierra total que no están siendo utilizadas para agriculturea segun[ Food and Agriculture Organization of the United Nations.](https://openknowledge.fao.org/items/4fd2b0b0-9c2f-42ec-bd08-56f88d963f08?utm_source=chatgpt.com) Al mismo tiempo, también podria tomar provecho para productores de pocos recursos, en un estudio en Papúa Occidental sobre pequeños productores de papas encontró que la eficiencia técnica promedio era de apenas el 52 %, similar a valores de países en desarrollo (entre 40 % y 70 %). Los factores que más contribuyeron a la ineficiencia fueron la baja frecuencia de asistencia técnica, el ingreso familiar reducido, baja comercialización, y el aislamiento geográfico. El estudio concluye que la eficiencia puede mejorar mediante mejoras tecnológicas, insumos adecuados, infraestructura y asesoramiento agrícola intensivo. [Research Gate, 2023](https://www.researchgate.net/publication/373067057_Technical_efficiency_of_traditional_agriculture_based_on_local_knowledge_of_smallholder_farmers)



## Propuesta Técnica

El proyecto consisteria en un diseño de un sistema agrícola semi-autónomo, capaz de producir alimentos con mínima supervisión humana. Este sistema integraría diferentes tecnologías para lograr un funcionamiento sostenible y escalable mientras utiliza la menor cantidad de intervencion humana: 

Energía renovable: utilizaría fuentes como paneles solares o turbinas eólicas para autoabastecerse.
Gestión hídrica: incorporaría mecanismos de recolección y aprovechamiento de agua de lluvia, para automatizar el riego.
Cobertura de grandes superficies: estaría diseñado para abarcar extensas hectáreas de cultivo, desde la siembra hasta el cuidado y la cosecha, Estaria incoporando conceptos de mobimiento del equimento para realizar las diferentes tareas de mantenimiento, consideraciones de climas para la logistica yplaneaciones de cobertura
Automantenimiento: El sistema podría monitorear el estado de los cultivos, detectar plagas o deficiencias nutricionales. Inclusivemente sistemas de autodeteccion de problemas al respecto al equipo e inclusive auto reparaciones de o auto mantenimiento del sistema en si que requirea de intervencion minima.


### Energía renovable:
- Paneles solares y turbinas eólicas para garantizar el autoabastecimiento.  

#### Paneles Solares
Cuando se da las consderaciones de las fuentes de energias renovables se deben observar que estas depende tambien de las logisticas relacionadas a la cercanias y logisticas de donde se encontrarian, tambien omar enc cuenta cosas como amntneimiento, aqui se presentan las siguientes alternativas

| Característica           | Monocristalinos                  | Policristalinos            | Capa fina                     | Bifaciales                            |
| ------------------------ | -------------------------------- | -------------------------- | ----------------------------- | ------------------------------------- |
| **Eficiencia**           | Alta (18–22%)                    | Media (15–18%)             | Baja (10–13%)                 | Alta (20–24% aprovechando reflexión)  |
| **Costo relativo**       | Más caro                         | Medio                      | Más barato                    | Caro                                  |
| **Durabilidad**          | 25–30 años                       | 20–25 años                 | 15–20 años                    | 25–30 años                            |
| **Espacio necesario**    | Menos (alta densidad)            | Más                        | Mucho más                     | Similar a monocristalino              |
| **Rendimiento en calor** | Mejor en climas fríos            | Estables en calor          | Mejor en calor                | Similar a monocristalino              |
| **Aplicación típica**    | Hogares con poco espacio, techos | Hogares/campos con espacio | Proyectos grandes, bajo costo | Campos abiertos con suelo reflectante |
| **Mantenimiento**        | Bajo (limpieza periódica)        | Bajo                       | Bajo                          | Bajo                                  |
##### Monocristalinos vs Policristalinos
Se suele documentar que los paneles monocristalinos tienen eficiencia superior frente a los policristalinos; por ejemplo, un estudio comparativo concluye que los monocristalinos “ofrecen mayor eficiencia” aunque a mayor costo ([Comparative Analysis of Solar Cell Efficiency between Monocrystalline and Polycrystalline](https://www.researchgate.net/publication/347350127_Comparative_Analysis_of_Solar_Cell_Efficiency_between_Monocrystalline_and_Polycrystalline)). Las eficiencias típicas citadas para monocristalinos van desde aproximadamente 17 % hasta más del 22 % en algunos modelos comerciales ([Solar Panel Efficiency Guide](https://www.solar.com/learn/solar-panel-efficiency)). En cuanto a degradación, los monocristalinos tienden a perder rendimiento más lentamente (alrededor de 0,3–0,5 % anual) frente a los policristalinos, que en algunos casos muestran tasas más elevadas (~0,5–0,7 %) ([Tongwei Solar Blog](https://en.tongwei.cn/blog/349.html)). Asimismo, muchos paneles monocristalinos están garantizados para una vida útil de 25 a 30 años, aunque esto depende del fabricante, siendo una práctica común en la industria fotovoltaica.

##### Paneles de capa fina

Los paneles solares de capa fina se fabrican depositando una o varias capas delgadas de material fotovoltaico sobre un sustrato (vidrio, metal o plástico). Se suele documentar que su eficiencia de conversión es menor frente a los monocristalinos y policristalinos: típicamente entre 10–13 % en condiciones comerciales, aunque algunos laboratorios han logrado eficiencias superiores al 20 % en ([National Renewable Energy Laboratory – NREL](https://www.nrel.gov/pv/cell-efficiency) ). En cuanto a costos, al usar menos material semiconductor y procesos de producción más baratos (rollo a rollo, recubrimiento por vapor), tienden a ser más económicos que los paneles de silicio cristalino. Tiene una vida útil de alrededor de 15–20 años, debido a mayor degradación por humedad y radiación UV ([Photovoltaics Report](https://www.ise.fraunhofer.de/en/publications/studies/photovoltaics-report.html)). 

##### Bifaciales

En otro lado, los paneles bifaciales aprovechan no solo la radiación incidente en la cara frontal, sino también la reflejada por el suelo u otras superficies en la cara trasera ([Bifacial solar photovoltaics – A technology review](https://www.sciencedirect.com/science/article/abs/pii/S1364032116002768)), lo que se cuantifica mediante el “factor de bifacialidad” y puede incrementar la producción de energía entre un 7 % y un 39 % ([Integration of bifacial photovoltaics in agrivoltaic systems: A synergistic design approach](https://www.sciencedirect.com/science/article/pii/S0306261921016986)) dependiendo de factores como el albedo del terreno, la inclinación del módulo o la presencia de sombras; estas ganancias, comprobadas en estudios de campo y evaluaciones de rendimiento, los convierten en una opción cada vez más relevante para instalaciones en grandes superficies abiertas, especialmente en proyectos agrovoltaicos o en suelos altamente reflectantes

#### Turbinas Eolicas Pequenias

| Característica                   | Eje Horizontal (HAWT)           | Eje Vertical (VAWT)          | Savonius (rotor vertical simple) |
| -------------------------------- | ------------------------------- | ---------------------------- | -------------------------------- |
| **Eficiencia**                   | Alta (30–40% del viento)        | Media (20–30%)               | Baja (10–15%)                    |
| **Costo relativo**               | Medio–alto                      | Medio                        | Bajo                             |
| **Durabilidad**                  | 15–20 años                      | 15 años aprox.               | 10–15 años                       |
| **Mantenimiento**                | Mayor (cojinetes, orientación)  | Medio (menos partes móviles) | Muy bajo                         |
| **Rendimiento con viento débil** | Regular (necesita ≥4 m/s)       | Mejor con vientos cambiantes | Funciona con vientos bajos       |
| **Aplicación típica**            | Campos abiertos, zonas ventosas | Áreas urbanas, techos        | Proyectos DIY, rurales pequeños  |
| **Espacio requerido**            | Torre alta (≥10 m)              | Puede ir en edificios        | Muy compacto                     |

#### Turbinas de eje horizontal (HAWT)

Las turbinas de eje horizontal son las más comunes y eficientes, con factores de capacidad que pueden alcanzar entre 30–40 % dependiendo de la ubicación ([IRENA – Future of Wind](https://www.irena.org/publications/2019/Sep/Future-of-wind)). Su diseño exige orientación al viento y torres altas, lo que encarece costos y mantenimiento (engranajes, sistemas de orientación, lubricación) ([Fraunhofer IEE Wind Energy Report](https://www.iee.fraunhofer.de/en/publications/studies/wind-energy-report.html)).

#### Turbinas de eje vertical (VAWT)

Las de eje vertical presentan eficiencias menores, típicamente 20–30 %, pero con la ventaja de captar viento desde cualquier dirección, reduciendo la necesidad de sistemas de orientación ([DOE Wind Energy Technologies Office](https://www.energy.gov/eere/wind/wind-energy-technologies-office)). Son más adecuadas para entornos urbanos o espacios limitados, aunque suelen tener mayor fatiga estructural y menor vida útil promedio que las HAWT.

#### Savonius (rotor vertical simple)

El rotor Savonius es un subtipo de VAWT de diseño muy simple, usado sobre todo para aplicaciones de pequeña escala o proyectos educativos. Su eficiencia es baja (10–15 %), pero funciona bien en vientos débiles y turbulentos, lo que lo hace viable en contextos rurales de bajo costo ([Manwell, McGowan & Rogers, _Wind Energy Explained_](https://onlinelibrary.wiley.com/doi/book/10.1002/0470846127)). Su mantenimiento es casi nulo por la simplicidad mecánica.



### Gestión hídrica automatizada:
- Sistemas de recolección de agua de lluvia.

#### Sensores
Sensores de humedad y riego inteligente por goteo.

|Tipo de sensor|Ejemplo/tecnología|Ventajas|Limitaciones|Contexto de uso|
|---|---|---|---|---|
|**Humedad TDR/FDR**|Sondas TDR (Time Domain Reflectometry), FDR|Alta precisión, referencia académica, buen desempeño en distintos suelos|Alto costo, calibración compleja|Campos experimentales, cultivos de alto valor|
|**Humedad capacitivos**|Sensores comerciales de bajo costo (ej. Decagon, Vegetronix)|Económicos, fáciles de instalar en malla densa|Menor precisión, sensibles a salinidad|Agricultura de precisión en parcelas extensas|
|**Nutrientes (ISE)**|Electrodos selectivos de NO₃⁻, NH₄⁺|Miden en tiempo real, aplicables a fertirriego|Vida útil corta, deriva, recalibración frecuente|Hidroponía, control de fertilización en campo|
|**Sensores ópticos para plagas**|Cámaras RGB/multiespectrales|Detectan cambios de color/índices vegetativos|Requieren algoritmos de visión robustos|Monitoreo aéreo con drones o estaciones fijas|
|**Sensores hiperespectrales**|UAVs con cámaras >100 bandas|Alta sensibilidad para detectar estrés temprano|Costosos, procesado de datos complejo|Investigación, detección temprana en cultivos críticos|


#### Algoritmos de Optimización de consumo hídrico según clima y tipo de cultivo.

|Tipo de algoritmo/software|Aplicación|Ventajas|Limitaciones|Ejemplo de uso|
|---|---|---|---|---|
|**MPC (Model Predictive Control)**|Riego|Optimiza en base a predicción climática y humedad|Requiere modelos precisos y computación mayor|Invernaderos, cultivos extensivos con riego presurizado|
|**Reglas fijas (threshold-based)**|Riego/fertirriego|Fácil implementación, bajo costo|Ineficiente ante variabilidad climática|Pequeñas parcelas, agricultores sin infraestructura digital|
|**VRT (Variable Rate Technology)**|Fertilización|Ahorro de insumos, dosis ajustada por zona|Necesita mapas previos (rendimiento, suelos)|Cereal extensivo (maíz, trigo, soja)|
|**Sensor-based fertilization**|Fertilización en tiempo real|Dosis instantánea según sensores (ópticos, N-sensor)|Dependencia de calibración local|Cultivos de alta densidad (trigo, arroz)|
|**DL/CNN**|Detección de plagas y enfermedades|Alta precisión, aprendizaje automático|Requiere datasets grandes, potencia de cómputo|UAVs, cámaras fijas en campo, smartphones con app|




#### Vehículos autónomos y drones para tareas de siembra, monitoreo y cosecha.

| Tipo                                  | Características                                               | Ventajas                                          | Limitaciones                                             | Ejemplos                                       |
| ------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------- |
| **UGV pequeños (robots de campo)**    | Plataformas ligeras (ej. Naïo, FarmDroid)                     | Bajo costo, accesibles para pequeños agricultores | Cobertura limitada por velocidad                         | Desmalezado, siembra en hileras                |
| **UGV grandes (tractores autónomos)** | Máquinas de gran porte con RTK-GNSS (ej. John Deere, Case IH) | Alta capacidad de trabajo en hectáreas extensas   | Costosos, alto consumo energético                        | Siembra, laboreo, pulverización a gran escala  |
| **Drones UAV multirotor**             | Movilidad aérea en pequeñas áreas                             | Flexibles, ideales para monitoreo puntual         | Tiempo de vuelo limitado (20–40 min)                     | Detección de estrés, imágenes multiespectrales |
| **Swarm robots (multi-robot)**        | Coordinación de varios robots pequeños                        | Escalabilidad, redundancia                        | Necesitan comunicación robusta y algoritmos distribuidos | Weeding autónomo, siembra colaborativa         |

##### UGV pequeños (robots de campo)

Los UGV ligeros como Naïo Technologies (Oz, Dino) o FarmDroid FD20 están diseñados para desmalezado, siembra y otras tareas repetitivas. Al ser eléctricos y relativamente baratos, son accesibles para pequeños agricultores. Sin embargo, su velocidad y autonomía son limitadas, lo que restringe la superficie cubierta diariamente ([Naïo Technologies](https://www.naio-technologies.com/), [FarmDroid](https://farmdroid.com/)).

##### UGV grandes (tractores autónomos)

Fabricantes como John Deere (autonomous 8R tractor) y Case IH han desarrollado tractores equipados con RTK-GNSS y sensores LIDAR que permiten trabajar de forma autónoma en grandes hectáreas. Son capaces de realizar siembra, laboreo y pulverización en extensiones masivas. Su principal limitación es el costo elevado y el consumo energético, lo que restringe su adopción a productores de gran escala.

##### Drones UAV multirotor

Los multirrotores destacan por su versatilidad y despegue vertical, lo que los hace útiles para inspecciones rápidas, detección de estrés hídrico y enfermedades, y monitoreo puntual. Su limitación principal es el tiempo de vuelo reducido (20–40 minutos) debido a la capacidad de las baterías ([Zhang & Kovacs, 2012, _Precision Agriculture_](https://doi.org/10.1007/s11119-012-9257-6)).

##### Swarm robots (multi-robot)

Los sistemas colaborativos de múltiples robots permiten escalar tareas como el desmalezado autónomo, la siembra distribuida y la recolección. Su fortaleza es la redundancia y escalabilidad, pero requieren algoritmos de control distribuido y comunicación robusta para evitar interferencias y colisiones ([Bayındır, 2016, _Swarm Robotics_](https://doi.org/10.1016/j.robot.2015.11.010)).



#### Explicación funcional

El sistema inicia con la planificación del ciclo agrícola, definida en un software central.
A partir de esta planificación, los vehículos autónomos realizan la siembra, mientras sensores distribuidos recopilan datos sobre humedad, temperatura y estado de los cultivos.
El riego inteligente se activa automáticamente cuando los sensores detectan déficit de agua.
Drones de monitoreo recorren los campos, generando mapas de plagas o enfermedades.
Todo el sistema se conecta a una plataforma digital en la nube, donde los productores o instituciones pueden supervisar y tomar decisiones estratégicas.


#### Escalas

| Tipo de productor                        | Sensores recomendados                                                                                                              | Algoritmos/software                                                                                                                                  | Maquinaria/robots                                                                                                 | Justificación práctica                                                                                                                               |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pequeño productor** (≤ 10 ha)          | - Sensores capacitivos de humedad (baratos, fáciles de instalar). - Cámaras RGB básicas en smartphone para plagas.                 | - Reglas fijas (umbral de humedad). - Apps móviles con IA ligera (detección de plagas por foto).                                                     | - UGV pequeños de desmalezado/siembra. - Drones multirotor para monitoreo puntual.                                | Bajo costo inicial, rápido retorno de inversión, fácil capacitación. Ideal donde no hay conectividad avanzada.                                       |
| **Mediano productor** (10–100 ha)        | - Malla combinada: capacitivos + 1–2 TDR/FDR de referencia. - ISE para nitrato en fertirriego. - Cámaras multiespectrales en dron. | - MPC para riego con pronóstico climático. - Sensor-based fertilization (ajuste instantáneo de N).                                                   | - UGV medianos (siembra y pulverización selectiva). - Drones ala fija para cobertura amplia.                      | Equilibrio entre costo y precisión. Permite ahorro de agua/fertilizante y mejora productividad en cultivos extensivos.                               |
| **Gran productor / Gobierno** (> 100 ha) | - Red densa de sensores TDR/FDR calibrados. - Estaciones de nutrientes (NO₃⁻, K, NH₄⁺). - UAV hiperespectrales.                    | - MPC avanzado + modelos predictivos de IA. - VRT (mapas de manejo) en tractores autónomos. - Deep Learning para detección temprana de enfermedades. | - Tractores autónomos de gran porte. - Swarm robots para labores repetitivas. - Drones ala fija de largo alcance. | Alta inversión inicial pero máximo rendimiento, escalabilidad y control de riesgos. Enfocado a seguridad alimentaria y sostenibilidad a gran escala. |



## Impacto humano y contextual

Este sistema beneficiaría directamente a los productores agrícolas o gobiernoes en donde pese a contar con tierras fértiles, carezcan de inversiones o de población con conocimientos agrícolas técnicos. A nivel social, contribuiría a mejorar la seguridad alimentaria y a disminuir la dependencia de mano de obra intensiva. En términos ambientales, favorecería un modelo de producción más sostenible al optimizar el uso del agua y la energía.

Entorno: Zonas rurales y agrícolas donde carezcan de inversiones o populacion con conocimiento agriculturares..

Actores involucrados: Productores agrícolas, cooperativas, organismos estatales de fomento agroindustrial, ingenieros electrónicos, mecánicos.

Condicionantes relevantes: Cambio climático (variabilidad de lluvias y temperaturas extremas), altos costos de producción, necesidad de energías limpias, escasez de mano de obra o entrenadas en áreas rurales. 