.PHONY: clean clean_build setup start lint check test

INFO = [INFO]

# Define the build directory
BUILD_DIR = dist
DEPS_DIR = node_modules

clean:
	@if [ -d "$(DEPS_DIR)" ]; then \
		echo "Removing $(DEPS_DIR)..."; \
		rm -r "$(DEPS_DIR)"; \
		rm -r "package-lock.json"; \
	fi

# Clean build directory if it exists
clean_build:
	@if [ -d "$(BUILD_DIR)" ]; then \
		echo "Removing $(BUILD_DIR)..."; \
		rm -r "$(BUILD_DIR)"; \
	fi

# Setup 
setup: clean
	@echo "$(INFO) Installing NPM dependencies..."
	@npm i 

# TS check	
check:
	@echo "Typechecking Js"
	./node_modules/.bin/tsc 

# Run server in dev mode
start:
	$(MAKE) browsersync &
	sleep 2
	$(MAKE) open-browser
	$(MAKE) dev-server
	

open-browser:
	xdg-open http://localhost:4000 || open http://localhost:4000 || start http://localhost:4000

browsersync:
	@node browsersync.cjs

dev-server:
	@npx serve dist -l 4000

# Run prettier source
pretty:
	@npx prettier ./ --write --cache --log-level=silent

# Build for production
build: clean_build
	@npx rollup -c

