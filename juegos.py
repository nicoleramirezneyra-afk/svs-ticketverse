"""Mini juegos del SVS para la terminal de VS Code. Ejecuta: python juegos.py"""
import random

COMPONENTES = {
    "Principios rectores": "Orientar todas las decisiones hacia el valor",
    "Gobernanza": "Alinear la gestión de servicios con los objetivos del negocio",
    "Cadena de valor del servicio": "Crear, entregar y dar soporte a productos y servicios",
    "Prácticas": "Dar capacidad a la organización para ejecutar las actividades",
    "Mejora continua": "Alinear los servicios con las expectativas cambiantes",
}

def quiz():
    nombres = list(COMPONENTES)
    puntos = 0
    for nombre in random.sample(nombres, len(nombres)):
        print(f"\nObjetivo: {COMPONENTES[nombre]}")
        for i, n in enumerate(nombres, 1):
            print(f"  {i}. {n}")
        r = input("Tu respuesta (1-5): ").strip()
        if r.isdigit() and nombres[int(r) - 1] == nombre:
            puntos += 1
            print("¡Correcto!")
        else:
            print(f"Era: {nombre}")
    print(f"\nPuntaje final: {puntos}/{len(nombres)}")

def adivina():
    secreto, intentos = random.randint(1, 50), 0
    print("\nAdivina el número de ticket (1-50).")
    while True:
        intentos += 1
        n = int(input("Número: "))
        if n == secreto:
            print(f"¡Resuelto en {intentos} intentos!")
            break
        print("Más alto" if n < secreto else "Más bajo")

if __name__ == "__main__":
    opcion = input("1) Quiz del SVS  2) Adivina el ticket: ")
    quiz() if opcion == "1" else adivina()