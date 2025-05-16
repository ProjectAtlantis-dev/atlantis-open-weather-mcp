# OpenWeather MCP Server

This is a copy of https://github.com/Zippland/weather-mcp ported to uvx

## Usage

### 1. Get an OpenWeatherMap API Key

Visit [OpenWeatherMap](https://openweathermap.org/) and register an account to obtain an API key.

### 2. Use in MCP Client Configuration

Add the following configuration to your MCP-supported client:

```json

{
  "mcpServers": {
    "openweather": {
      "command": "uvx",
      "args": [
        "--from",
        "atlantis-open-weather-mcp",
        "start-weather-server",
        "--api-key",
        "your key here"
      ]
    }
  }
}
```

### 3. Available Tools

#### get_weather

Get current weather and forecast for a specified location.

Parameters:
- `location`: Location name, e.g., "Beijing", "New York", "Tokyo"
- `api_key`: OpenWeatherMap API key (optional, will read from environment variable if not provided)
- `timezone_offset`: Timezone offset in hours, e.g., 8 for Beijing, -4 for New York. Default is 0 (UTC time)

#### get_current_weather

Get current weather for a specified location.

Parameters:
- `location`: Location name, e.g., "Beijing", "New York", "Tokyo"
- `api_key`: OpenWeatherMap API key (optional, will read from environment variable if not provided)
- `timezone_offset`: Timezone offset in hours, e.g., 8 for Beijing, -4 for New York. Default is 0 (UTC time)

## Usage Example

AI assistant call example:

```
User: What's the weather like in Nuuk right now?

AI: Let me check the current weather in Nuuk for you.
[Calling get_current_weather("Nuuk",0)]

Current weather in Nuuk: 2°C, partly cloudy, humidity 65%, wind speed 3.5m/s.
```

## Troubleshooting

If the server fails to start, check the URL and key