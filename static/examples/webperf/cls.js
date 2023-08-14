setTimeout(() => {
	const hellobar = document.querySelector('.js-hellobar');
	hellobar.classList.remove('hellobar--placeholder');
	console.log(hellobar);
	hellobar.innerHTML = `<p>Avec un peu de chance, ce petit message d'annonce vous a perdu dans votre lecture ou vous a empêché de cliquer sur le bouton. Niark niark niark&nbsp;!`;
}, 3000);
