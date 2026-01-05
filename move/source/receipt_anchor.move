module receipt_anchor::receipt_anchor {
    use std::string;
    use std::signer;
    use endless_framework::event;

    /*
     * ReceiptAnchoredEvent
     *
     * Emitted whenever a Web2 receipt is anchored on-chain.
     * This event acts as the immutable proof for off-chain systems.
     */
    struct ReceiptAnchoredEvent has drop, store {
        app_id: string::String,
        order_id: string::String,
        receipt_hash_hex: string::String,
        anchored_by: address,
    }

    /*
     * ReceiptStore
     *
     * Minimal on-chain storage to keep the latest anchored receipt
     * for a given owner (relayer / application owner).
     */
    struct ReceiptStore has key {
        last_app_id: string::String,
        last_order_id: string::String,
        last_receipt_hash_hex: string::String,
        total_anchored: u64,
    }

    /*
     * init
     *
     * Initializes receipt storage under the caller's address.
     * Expected to be called once by the relayer or application owner.
     */
    public entry fun init(account: &signer) {
        let owner = signer::address_of(account);

        if (!exists<ReceiptStore>(owner)) {
            move_to(account, ReceiptStore {
                last_app_id: string::utf8(b""),
                last_order_id: string::utf8(b""),
                last_receipt_hash_hex: string::utf8(b""),
                total_anchored: 0,
            });
        }
    }

    /*
     * anchor_receipt
     *
     * Anchors a Web2 receipt proof on Endless.
     *
     * Parameters:
     * - app_id: Identifier of the Web2 application
     * - order_id: Order or invoice ID from the Web2 system
     * - receipt_hash_hex: SHA-256 hash of the canonicalized receipt data
     *
     * Behavior:
     * - Auto-initializes storage if missing
     * - Updates latest receipt data
     * - Emits an on-chain event as immutable proof
     */
    public entry fun anchor_receipt(
        account: &signer,
        app_id: string::String,
        order_id: string::String,
        receipt_hash_hex: string::String
    ) acquires ReceiptStore {
        let owner = signer::address_of(account);

        if (!exists<ReceiptStore>(owner)) {
            init(account);
        }

        let store = borrow_global_mut<ReceiptStore>(owner);

        store.last_app_id = app_id;
        store.last_order_id = order_id;
        store.last_receipt_hash_hex = receipt_hash_hex;
        store.total_anchored = store.total_anchored + 1;

        event::emit(ReceiptAnchoredEvent {
            app_id: store.last_app_id,
            order_id: store.last_order_id,
            receipt_hash_hex: store.last_receipt_hash_hex,
            anchored_by: owner,
        });
    }

    /*
     * get_last
     *
     * View function to retrieve the latest anchored receipt
     * for a given owner address.
     */
    public fun get_last(
        owner: address
    ): (string::String, string::String, string::String, u64) acquires ReceiptStore {
        let store = borrow_global<ReceiptStore>(owner);

        (
            store.last_app_id,
            store.last_order_id,
            store.last_receipt_hash_hex,
            store.total_anchored
        )
    }
}
