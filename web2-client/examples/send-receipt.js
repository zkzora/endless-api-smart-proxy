// Node 18+ recommended

async function main() {
  const url = process.env.PROXY_URL || "http://localhost:8787/v1/anchor/receipt";
  const apiKey = process.env.API_KEY || "app_demo_key";

  const payload = {
    appId: "demo-cashier-001",
    receipt: {
      orderId: "INV-10291",
      amount: 125000,
      currency: "IDR",
      timestamp: Math.floor(Date.now() / 1000),
      items: [{ sku: "A12", qty: 1, price: 125000 }]
    }
  };

  const r = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify(payload)
  });

  const out = await r.json();
  console.log(out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
