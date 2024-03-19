// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn say_hello() -> String {
  return "Hello from Rust!".into();
}

#[tauri::command]
fn greet(name:String) -> String {
  return format!("Hello, {}!", name);
}


fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![say_hello, greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
