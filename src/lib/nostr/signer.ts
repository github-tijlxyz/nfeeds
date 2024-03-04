import { type Event, type EventTemplate } from 'nostr-tools';

interface Window {
	nostr: any;
}
declare const window: Window;

export class Signer {
	public static async getPublicKey(): Promise<string> {
		const login = localStorage.getItem('nostr-login');

		if (login === 'NIP07') {
			return window.nostr.getPublicKey();
		} else {
			throw new Error();
		}
	}

	public static async signEvent(unsignedEvent: EventTemplate): Promise<Event> {
		const login = localStorage.getItem('nostr-login');

		if (login === 'NIP07') {
			return window.nostr.signEvent(unsignedEvent);
		} else {
			throw new Error();
		}
	}

	public static async getRelays(): Promise<{ [url: string]: { read: boolean; write: boolean } }> {
		const login = localStorage.getItem('nostr-login');

		if (login === 'NIP07') {
			try {
				return await window.nostr.getRelays();
			} catch (error) {
				return {};
			}
		} else {
			return {};
		}
	}

	public static async encrypt(pubkey: string, plaintext: string): Promise<string> {
		const login = localStorage.getItem('nostr-login');

		if (login === 'NIP07' && window.nostr.nip04 !== undefined) {
			return await window.nostr.nip04.encrypt(pubkey, plaintext);
		} else {
			throw new Error();
		}
	}

	public static async decrypt(pubkey: string, ciphertext: string): Promise<string> {
		const login = localStorage.getItem('nostr-login');

		if (login === 'NIP07' && window.nostr.nip04 !== undefined) {
			return await window.nostr.nip04.decrypt(pubkey, ciphertext);
		} else {
			throw new Error();
		}
	}
}
