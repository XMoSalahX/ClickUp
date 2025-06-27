export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "My API",
      description: "API documentation",
      contact: {
        name: "Your name",
        email: "Your email",
      },
      version: "1.0.0",
    },
    basePath: "/",
  },
  apis: ["../handeler/userHandeler.ts"],
};
