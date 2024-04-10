
document.addEventListener("DOMContentLoaded", function() {
    
    const ofertasTab = document.getElementById('ofertas-tab');
    
    const grillaOfertas = document.getElementById('grilla-ofertas');

   
    ofertasTab.addEventListener('click', function(event) {
       
        grillaOfertas.style.display = 'block';


        fetch('ofertas.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                
                grillaOfertas.innerHTML = '';

               
                data.forEach(oferta => {
                    const ofertaElement = document.createElement('div');
                    ofertaElement.classList.add('oferta');
                    ofertaElement.innerHTML = `
                        <img src="${oferta.imagen}" alt="${oferta.nombre}" class="imagen-oferta">
                        <h3>${oferta.nombre}</h3>
                        <p class="precio-oferta">$${oferta.precio}</p>
                    `;
                   
                    grillaOfertas.appendChild(ofertaElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
