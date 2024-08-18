# Define the build directory
BUILD_DIR = dist
DEPS_DIR = node_modules

clean:
	@if [ -d "$(DEPS_DIR)" ]; then \
		echo "Removing $(DEPS_DIR)..."; \
		rm -r "$(DEPS_DIR)"; \
		rm -r "package-lock.json"; \
	fi

# Setup 
setup: clean
	@npm i web

# Run server in dev mode
serve:
	@npm run serve

# Run prettier source
pretty:
	@npx prettier . --write

# Build for production
build: clean_build
	@npm run build

# Clean build directory if it exists
clean_build:
	@if [ -d "$(BUILD_DIR)" ]; then \
		echo "Removing $(BUILD_DIR)..."; \
		rm -r "$(BUILD_DIR)"; \
	fi