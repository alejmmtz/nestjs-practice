# Explicación de la Entrega

## Recorrido de petición

La Petición primero es recibida en el controller que analiza su tipo y su contenido para poder usar la función adecuada, cuando la encuentra hace un llamado al servicio y la función especifica que busca resolver y dar una respuesta adecuada a la petición, una vez el controller obtiene la información la devuelve con un return.

## Tres piezas de inyección de Service

1. Que sea inyectable, usamos la etiqueta:

```
@Injectable()
```

2. Que se encuentre importado como provider en el modulo:

```

@Module({
  controllers: [LoansController],
  providers: [LoansService],
})

```

3. Inicializarlo con el contructor adecuado en el controller:

```
constructor(private readonly loansServices: LoansService)
```

## Funcionamiento del código

La mayoría de funciones en el servicio funcionan adecuadamente por si solas y cumplen la función ampliamente al ser llamadas al controlador, pero algunas funciones del controlador necesitan de varias funciones en el servicio para lograr mostrar la información adecuadamente y lograr dar una buena resolución en la muestra de errores.
