class Personagem {
    #HP;

    constructor(nome, HP, poderDeAtaque) {
        if (typeof HP !== 'number' || HP <= 0) {
            throw new Error('HP deve ser um número maior que 0');
        }

        this.nome = nome;
        this.#HP = HP;
        this.poderDeAtaque = poderDeAtaque;
    }

    receberDano(valor) {
        if (valor <= 0) return;

        this.#HP -= valor;

        if (this.#HP <= 0) {
            this.#HP = 0;
        }
    }

    exibirStatus() {
        if (this.#HP > 0) {
            return console.log(`${this.nome} está vivo e com ${this.#HP} pontos de vida!`);
        }

        if (this.#HP <= 0) {
            return console.log(`${this.nome} foi derrotado!`);
        }
    }

    estaVivo() {
        return this.#HP > 0;
    }
}

class Guerreiro extends Personagem {
    constructor(nome, HP, poderDeAtaque, forcaFisica) {
        super(nome, HP, poderDeAtaque);
        this.forcaFisica = forcaFisica;
    }

    atacar(alvo) {
        const valor = this.poderDeAtaque + this.forcaFisica;
        console.log(`${this.nome} realizou um golpe poderoso de espada! ⚔️`);

        alvo.receberDano(valor);
    }
}

class Mago extends Personagem {
    constructor(nome, HP, poderDeAtaque, poderMagico) {
        super(nome, HP, poderDeAtaque);
        this.poderMagico = poderMagico;
    }

    atacar(alvo) {
        const valor = this.poderDeAtaque + this.poderMagico * 2;
        console.log(`${this.nome} lançou uma magia forte! 🪄`);

        alvo.receberDano(valor);
    }
}

const guerreiro1 = new Guerreiro('Guerreiro Alexander', 150, 25, 20);
const mago2 = new Mago('Mago Harry', 100, 30, 20);

function simularBatalha(personagem1, personagem2) {
    console.log('');
    console.log('---- STATUS INICIAIS ----');
    console.log('');
    console.log('🔸 Dados do personagem 1');
    console.log(personagem1);
    personagem1.exibirStatus();
    console.log('');
    console.log('🔹 Dados do personagem 2');
    console.log(personagem2);
    personagem2.exibirStatus();
    console.log('');

    console.log('---- BATALHA ÉPICA ----');

    let rodada = 1;

    while (personagem1.estaVivo() && personagem2.estaVivo()) {
        console.log('');
        console.log(`🔁 RODADA ${rodada}`);

        personagem1.atacar(personagem2);
        console.log('');
        personagem2.exibirStatus();
        if (!personagem2.estaVivo()) {
            break;
        }

        personagem2.atacar(personagem1);
        console.log('');
        personagem1.exibirStatus();
        if (!personagem1.estaVivo()) {
            break;
        }

        console.log('');
        console.log('-------------------');

        rodada++;
    }

    console.log('');
    console.log('---- STATUS FINAIS ----');
    console.log('');
    console.log('🔸 Dados do personagem 1');
    console.log(personagem1);
    personagem1.exibirStatus();
    console.log('');
    console.log('🔹 Dados do personagem 2');
    console.log(personagem2);
    personagem2.exibirStatus();
    console.log('');
}

simularBatalha(guerreiro1, mago2);
