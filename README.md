c# Greenpeace Planet 4 Nordic Child Theme

The **Planet 4 Nordic Child Theme** is a child theme built for the [Planet 4](https://www.greenpeace.org) project. It customizes the parent theme by adding unique features and styles specific to the Nordic region. This child theme customisez the [Planet4 Master Theme](https://github.com/greenpeace/planet4-master-theme) following this [Design System](https://zeroheight.com/05f6e9516/p/76cd7b-planet-4-design-system).

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [File Structure](#file-structure)
- [Coding Standards](#coding-standards)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/) (v16 recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Composer](https://getcomposer.org/) (for PHP dependencies and coding standards)
- [WordPress](https://wordpress.org/) setup (parent theme and WordPress installation)

## Installation

To install and set up the theme locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/greenpeace/planet4-child-theme-nordic.git
    ```

2. **Navigate to the theme directory**:

    ```bash
    cd planet4-nordic-child-theme
    ```

3. **Install the npm dependencies**:

    Run `npm install` to install all necessary Node.js packages:

    ```bash
    npm install
    ```

4. **Install Composer dependencies**:

    Run `composer install` to install PHP dependencies (like coding standards):

    ```bash
    composer install
    ```

5. **Activate the theme**:

    - Upload the child theme to your WordPress `/wp-content/themes` directory.
    - Activate the theme from the WordPress admin dashboard (`Appearance > Themes`).

## Usage

Once installed, the theme can be customized and extended as per the needs of the Nordic campaign. The child theme inherits most of its functionality from the parent theme, but you can add custom styles, templates, and features as needed.

To modify or add features to the theme, navigate to the `planet4-nordic-child-theme` directory, make changes to the appropriate files, and use the provided npm scripts for development.

## Development

### Available npm Scripts

- **Build CSS**: Compiles the SCSS files into a minified CSS file.

    ```bash
    npm run build:css
    ```

- **Build**: Compiles all assets for production using Webpack and outputs them to the `build/` directory.

    ```bash
    npm run build
    ```

- **Start**: Launches a development server with live reloading and builds assets in development mode.

    ```bash
    npm run start
    ```

- **Lint CSS**: Lints the SCSS files to ensure coding standards are followed.

    ```bash
    npm run lint:css
    ```

### Composer Scripts for PHP Code Standards

- **Fixes**: Automatically fixes PHP code style issues.

    ```bash
    composer run fixes
    ```

- **Sniffs**: Runs PHP CodeSniffer (`phpcs`) to check PHP files against coding standards.

    ```bash
    composer run sniffs
    ```

## File Structure

Here's a brief overview of the key directories and files in the project:

```plaintext
planet4-nordic-child-theme/
├── assets/             # Compiled theme assets (CSS, JS)
│   ├── build/          # Output directory for compiled and minified production assets
│   └── src/            # Source SCSS and JS files
├── includes/           # Theme-specific PHP includes
├── page-templates/     # Theme-specific Twig templates 
├── vendor/             # Composer dependencies
├── functions.php       # Main theme functions
├── webpack.config.js   # Webpack configuration for asset bundling
├── style.css           # Main stylesheet (import parent theme styles)
├── package.json        # Node.js dependencies and npm scripts
├── composer.json       # PHP dependencies and Composer scripts
└── README.md           # Project documentation (this file)
```

### Customization

To override parent theme styles, place your custom SCSS files in the `assets/src/scss/` directory. These files are automatically compiled and output to `assets/build/` when running the build scripts.

### Coding Standards

We follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/) to ensure clean, readable, and maintainable code.

The coding standards are enforced through `phpcs` (PHP CodeSniffer) and can be automatically corrected using `phpcbf`. Composer handles both tools.

To check for coding standard violations:

```bash
composer run sniffs
```

To automatically fix issues:

```bash
composer run fixes
```

## Contributing

We welcome contributions! To contribute to this project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feat/my-feature`).
3. Make your changes.
4. Push your branch (`git push origin feat/my-feature`).
5. Open a Pull Request.

Please ensure that your code follows the project's coding standards. Use `npm run lint:css` for CSS and `composer run sniffs` for PHP.


## License
This project is licensed under the [GNU License](LICENSE). See the LICENSE file for details.

