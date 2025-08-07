'use strict';

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ('value' in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}

var ProblemMetadata =
	/*#__PURE__*/
	(function () {
		function ProblemMetadata(slug) {
			var _ref =
					arguments.length > 1 && arguments[1] !== undefined
						? arguments[1]
						: {},
				_ref$name = _ref.name,
				name = _ref$name === void 0 ? '' : _ref$name,
				_ref$description = _ref.description,
				description =
					_ref$description === void 0 ? '' : _ref$description,
				_ref$difficulty = _ref.difficulty,
				difficulty =
					_ref$difficulty === void 0 ? 'EASY' : _ref$difficulty,
				_ref$tags = _ref.tags,
				tags = _ref$tags === void 0 ? [] : _ref$tags;

			_classCallCheck(this, ProblemMetadata);

			this.slug = slug;
			this.file_path = ''.concat(slug, '.js');
			this.test_slug = slug;
			this.name = name;
			this.description = description;
			this.difficulty = difficulty;
			this.tags = tags;
		}

		_createClass(ProblemMetadata, [
			{
				key: 'asJson',
				get: function get() {
					return {
						slug: this.slug,
						file_path: this.file_path,
						test_slug: this.test_slug,
						name: this.name,
						description: this.description,
						difficulty: this.difficulty,
						tags: this.tags
					};
				}
			}
		]);

		return ProblemMetadata;
	})();

module.exports = {
	ProblemMetadata: ProblemMetadata
};
