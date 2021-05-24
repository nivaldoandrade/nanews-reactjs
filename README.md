<h1 align="center">NA news</h1>


<p align="center"><a href="https://www.youtube.com/watch?v=keHmznJrX8w" target="_blank"><img src="https://img.youtube.com/vi/keHmznJrX8w/0.jpg"/></a></p>


O nanews é um blog por assinatura mensal utilizando o stripe como sistema de pagamento, prismic como CMS para criação dos posts e FaunaDB como banco de dados.


## **Configurações Iniciais**

```
  # clonar o repositório
  git clone https://github.com/nivaldoandrade/nanews-reactjs

  # Instalar as dependências dentro da pasta clonada
  yarn

  # Iniciar a aplicação
  yarn dev

```
## **Configurações do Prismic**
1. Criar um repositório na [dashboard;](https://prismic.io/dashboard)   
2. Criar um **Custom Types** do tipo **Repeatable Type** com o nome **post** com a **build mode**:
```
{
  "Main" : {
    "uid" : {
      "type" : "UID",
      "config" : {
        "label" : "uid"
      }
    },
    "title" : {
      "type" : "StructuredText",
      "config" : {
        "single" : "heading1",
        "label" : "Title"
      }
    },
    "content" : {
      "type" : "StructuredText",
      "config" : {
        "multi" : "paragraph, preformatted, heading1, heading2, heading3, heading4, heading5, heading6, strong, em, hyperlink, image, embed, list-item, o-list-item, rtl",
        "allowTargetBlank" : true,
        "label" : "Content"
      }
    }
  }
}
```
## **Configurações do Git Hub APP**

Necessário a criação de um [OAuth Apps](https://github.com/settings/developers)

Para mais informações sobre o Git Hub APP: [DOCUMENTAÇÃO DO GITHUB APP.](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)

## **Configurações do FaunaDB**

Realizar a criação de um banco de dados no FaunaDB cloud: [Dashboard.](https://dashboard.fauna.com/)

## **Configurações do Stripe**
No dashboard do stripe iremos criar um [produto](http://dashboard.stripe.com/products/create).
Opcional: 
- **nome**: subscribe
- **modelo de preços**: padrão
- **preço**: recorrente
- **Período de faturamento**: Mensal


**Criação Collections e Indexes**: 
```
 	Collections:
	 users - {
			name: "users",
			history_days: 30,
			ttl_days: null
		}
	 subscriptions - {
			name: "subscriptions",
			history_days: 30,
			ttl_days: null
		}

	Indexes:
		subscription_id - {
			name: "subscription_id",
			unique: false,
			serialized: true,
			source: "subscriptions",
			terms: "data.id"
		}

		subscription_status - {
			name: "subscription_status",
			unique: false,
			serialized: true,
			source: "subscriptions",
			terms: "data.status"
		}

		subscription_user_id - {
			name: "subscription_user_id",
			unique: true,
			serialized: true,
			source: "subscriptions",
			terms: "data.user_id"
		}

		user_email - {
			name: "user_email",
			unique: true,
			serialized: true,
			source: "users",
			terms: "data.email"
		}

		user_stripe_customer_id - {
			name: "user_stripe_customer_id",
			unique: false,
			serialized: true,
			source: "users",
			terms: "data.stripe_customer_id"
		}
```

## **Configurações .ENV da aplicação**

### **Primsic**
```
#Prismic
PRISMIC_API_ENDPOINT=
PRISMIC_ACCESS_TOKEN=
```
**Prismic API Endpoint e Gerar token:** [API & Security.](https://spacetraveling-7.prismic.io/settings/apps/)

### **Stripe**
```
#Stripe
STRIPE_API_KEY=
NEXT_PUBLIC_STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRODUCT_PRICE_ID=
STRIPE_SUCCESS_URL=http://localhost:3000/posts
STRIPE_CANCEL_URL=http://localhost:3000/
```
- **STRIPE_API_KEY** pública e privada, na parte de desenvolvedor no dashboard do stripe : [API KEYS.](https://dashboard.stripe.com/test/apikeys)
- **STRIPE_WEBHOOK_SECRET** é a chave que o stripe CLI cria para a aplicação saber se de fato a chama a rota webhooks está sendo feita pelo stripe CLI. OBS: Em caso da aplicação em produção precisamos gerar [END POINT](https://dashboard.stripe.com/webhooks).

	Como instalar o stripe CLI para testes no localhost e a geração da chave webhooks: [DOCUMENTAÇÃO WEBHOOKS.](https://stripe.com/docs/webhooks/test)
- **STRIPE_PRODUCT_PRICE_ID** acessando o [produto](https://dashboard.stripe.com/products) terá o ID do produto.
- **STRIPE_SUCCESS_URL** será a URL de redirecinamento se caso o pagamento pelo stripe foi um sucesso.
- **STRIPE_CANCEL_URL** será a URL de redirecinamento se caso o pagamento pelo stripe foi cancelado ou ocorreu algum erro.

### **GIT HUB**
```
#Github
GITHUB_ID=
GITHUB_SECRET=
```

- **GITHUB_ID** é o client ID gerado na criação do OAuth Apps.
- **GITHUB_SECRET** é a client secrets gerado na criação do OAuth Apps.

### **FaunaDB**

```
FAUNADB_KEY=
```
 - **FAUNADB_KEY** gerar a chave: security > keys, será gerado chave. [KEYS](https://docs.fauna.com/fauna/current/security/keys)

### **JWT**
```
#JWT
JWT_SIGNING_PRIVATE_KEY=
```
Seguir a seguinte [DOCUMENTAÇÃO JWT_AUTO_GENERATED_SIGNING_KEY.](https://next-auth.js.org/warnings#jwt_auto_generated_signing_key)

### **Next Auht**
```
NEXTAUTH_URL=http://localhost:3000
```
- **NEXTAUTH_URL** é a URL da aplicação.

OBS: Em produção, modificar para a URL de acesso ao domínio cadastrado.

## Tecnologias

- ReactJS;
- Next.js;
- Typescript;
- Sass;
- Prismic;
- Stripe;
- React icons;
- Axios;
- NextAuth;
- FaunaDB.


**Um pequeno aprendiz nesse grande mundo da programação.** 😃🗺

