#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["EurekaClient/EurekaClient.csproj", "EurekaClient/"]
RUN dotnet restore "EurekaClient/EurekaClient.csproj"
COPY . .
WORKDIR "/src/EurekaClient"
RUN dotnet build "EurekaClient.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EurekaClient.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EurekaClient.dll"]