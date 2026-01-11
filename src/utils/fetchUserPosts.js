// src/utils/UserPostsService.js
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Función que utiliza la función global 'fetch' que debe ser espiada y mockeada.
export async function fetchUserPosts(userId) {
    if (userId <= 0) {
        throw new Error("ID de usuario no válido.");
    }
    
    // Llamada a la función global que el alumno debe espiar
    const response = await fetch(`${API_URL}?userId=${userId}`);

    if (!response.ok) {
        // Manejo de errores como 404 o 500
        throw new Error(`Fallo en la conexión: ${response.status}`);
    }
    
    const posts = await response.json();
    console.log(posts);

    if (posts.length === 0) {
        return { count: 0, message: `Usuario ${userId} no tiene posts.` };
    } else {
        return { count: posts.length, message: `Se encontraron ${posts.length} posts.`, posts };
    }
}