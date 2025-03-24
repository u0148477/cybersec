"use server"

const SECRET_KEY = "fake_key_for_testing"

function xorStrings(str1: string, str2: string): string {
  const length = Math.max(str1.length, str2.length);

  return Array.from({ length }, (_, i) =>
    String.fromCharCode(
      str1.charCodeAt(i % str1.length) ^ str2.charCodeAt(i % str2.length)
    )
  ).join('');
}

export async function generateCookie(value: string): Promise<string> {
  const timestamp = new Date().toISOString()
  const signature = xorStrings(xorStrings(xorStrings(value, SECRET_KEY), timestamp), SECRET_KEY)
  const b64Signature = btoa(signature)

  return `${value}|${timestamp}|${b64Signature}`
}

export async function decodeCookie(cookie: string): Promise<{ success: boolean, value: string }> {
  try {
    const parts = cookie.split("|")

    if (parts.length !== 3) {
      throw new Error("Supplied cookie does not have 3 parts.")
    }

    const [value, timestamp, b64signature] = parts
    const signature = atob(b64signature)

    const expectedSignature = xorStrings(xorStrings(xorStrings(value, SECRET_KEY), timestamp), SECRET_KEY)

    if (signature !== expectedSignature) {
      throw new Error("Cookie signature is invalid.")
    }

    return { success: true, value: value }
  } catch (error) {
    return { success: false, value: "" }
  }
}
